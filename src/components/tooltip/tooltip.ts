import './tooltip.scss';

export class Tooltip {
    constructor() {
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';

        this.el.classList.add(this.name);
        this.el.classList.toggle(`${this.name}_active`, false);

        this.listeners = [];

        document.body.appendChild(this.el);

        this.onHide = this.onHide.bind(this);
    }

    get name() {
        return 'tooltip';
    }

    get indent() {
        return 5;
    }

    delegate(eventName, element, cssSelector, callback) {
        const fn = (event) => {
            if (event.target.closest(cssSelector)) {
                callback({
                    event,
                    contentTarget: event.target
                        .closest(cssSelector)
                        .querySelector('[data-tooltip-content]'),
                });
            }
        };

        element.addEventListener(eventName, fn);
        this.listeners.push({ fn, element, eventName });

        return this;
    }

    onShow = ({ event, contentTarget }) => {
        this.el.innerHTML = contentTarget.innerHTML;
        this.el.classList.toggle(`${this.name}_active`, true);

        const spanRect = event.target.getBoundingClientRect();
        const elRect = this.el.getBoundingClientRect();

        let top = spanRect.bottom + this.indent;

        if (top + elRect.height > document.documentElement.clientHeight) {
            top = spanRect.top - elRect.height - this.indent;
        }

        let left = spanRect.left + this.indent;

        if (left + elRect.width > document.documentElement.clientWidth) {
            left =
                left -
                (left + elRect.width - document.documentElement.clientWidth) -
                this.indent;
        }

        this.el.style.top = `${top}px`;
        this.el.style.left = `${left}px`;
    };

    onHide() {
        this.el.classList.toggle(`${this.name}_active`, false);
    }

    attachClick(root) {
        root.addEventListener('click', (event) => {
            if (
                event.target.closest('[data-tooltip]') &&
                !this.el.classList.contains('tooltip_active')
            ) {
                this.onShow({
                    event,
                    contentTarget: event.target
                        .closest('[data-tooltip]')
                        .querySelector('[data-tooltip-content]'),
                });
            } else if (
                !event.target.closest('.tooltip') &&
                this.el.classList.contains('tooltip_active')
            ) {
                this.onHide();
            }
        });
    }

    attach(root) {
        this.delegate(
            'mouseover',
            root,
            '[data-tooltip]',
            this.onShow
        ).delegate('mouseout', root, '[data-tooltip]', this.onHide);
    }

    detach() {
        for (const { fn, element, eventName } of this.listeners) {
            element.removeEventListener(eventName, fn);
        }
    }
}
