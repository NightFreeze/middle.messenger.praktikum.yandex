import { v4 as makeUUID } from 'uuid';
import { EventBus } from './event-bus';

export class Block<T extends object = {}> {
    public static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
        FLOW_CWU: 'flow:component-will-unmount',
    };

    private _element: HTMLElement | null = null;

    private _meta: { tagName: string } = { tagName: 'div' };

    private _events: Record<string, (e: Event) => void> = {};

    public id: string | null = null;

    public props: T;

    public children: Record<string, Block> = {};

    public eventBus: EventBus;

    public state: Record<string, unknown> = this._makeProxyObj({});

    constructor(tagName = 'div', props: T = <T>{}) {
        this._meta = { tagName };

        this.id = makeUUID();
        this.props = this._makeProxyObj(props);

        const eventBus = new EventBus();
        this.eventBus = eventBus;
        this._registerEvents(eventBus);

        this.children = this.getChildren();

        eventBus.emit(Block.EVENTS.INIT);
    }

    public get element() {
        return this._element;
    }

    public get value() {
        return '';
    }

    public init() {
        this._createResources();
    }

    private _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        if (this.id) {
            element.setAttribute('data-id', this.id);
        }
        return element;
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
        this._setAttributes();
    }

    private _setAttributes() {
        const attributesObj = this.getAttributes();

        Object.keys(attributesObj).forEach((key) => {
            this._element?.setAttribute(key, attributesObj[key]);
        });
    }

    protected getAttributes(): Record<string, string> {
        return {};
    }

    protected getChildren(): Record<string, Block> {
        return {};
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(
            Block.EVENTS.FLOW_CWU,
            this._componentWillUnmount.bind(this)
        );
    }

    private _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    public componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
        this._render();
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentWillUnmount();
        });
    }

    public componentWillUnmount() {}

    public dispatchComponentWillUnmount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CWU);
        this._unmount();
    }

    private _componentDidUpdate(prevProps: T, newProps: T) {
        const response = this.componentDidUpdate(prevProps, newProps);
        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    public componentDidUpdate(oldProps: T, newProps: T) {
        return true;
    }

    public getContent() {
        return this.element;
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return {};
    }

    public compile(pugPrecompile: any, props?: Record<string, unknown>) {
        const propsAndChildren = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndChildren[key] = `<div data-id="${child.id}"></div>`;
        });

        const fragment = document.createElement('template');

        fragment.innerHTML = pugPrecompile(propsAndChildren);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(
                `[data-id="${child.id}"]`
            );
            const childContent = child.getContent();
            if (childContent) {
                stub?.replaceWith(childContent);
            }
        });

        return fragment.content;
    }

    public setProps(nextProps: Partial<T>) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    public setState(newState: Record<string, unknown>) {
        Object.assign(this.state, newState);
    }

    private _render() {
        const block = this.render();

        this._removeEvents();

        if (this._element) {
            this._element.innerHTML = '';
            this._element.appendChild(block);
        }
        this._addEvents();
    }

    private _unmount() {
        this._removeEvents();

        if (this._element) {
            this._element.remove();
        }
    }

    public render(): DocumentFragment;

    private _makeProxyObj<S extends object>(props: S) {
        const proxyProps = new Proxy<S>(props, {
            set: (target, prop, value) => {
                if (target[prop as keyof S] === value) {
                    return true;
                }

                target[prop as keyof S] = value;
                this.eventBus.emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty: () => {
                throw new Error('нет доступа');
            },
        });

        return proxyProps;
    }

    private _addEvents() {
        const events = this.getEvents() || {};
        this._events = events;

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        Object.keys(this._events).forEach((eventName) => {
            this._element?.removeEventListener(
                eventName,
                this._events[eventName]
            );
        });
    }
}
