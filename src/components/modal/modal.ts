import { Block } from '~src/utils/block';
import modalTemplate from './modal.tmpl.pug';
import './modal.scss';

export class Modal extends Block {
    constructor({ contentBlock }) {
        super('div', { contentBlock });
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'modal modal-hidden',
        };
    }

    protected getEvents() {
        return {
            click: (event) => {
                event.preventDefault();
                if (event.target === this.getContent()) {
                    this.hide();
                }
            },
        };
    }

    protected getChildren(): Record<string, Block> {
        return {
            content: this.props.contentBlock,
        };
    }

    public show() {
        this.getContent()?.classList.remove('modal-hidden');
    }

    public hide() {
        this.getContent()?.classList.add('modal-hidden');
    }

    public render() {
        return this.compile(modalTemplate);
    }
}
