import { Block } from '~src/utils/block';
import submitButtonTemplate from './button.tmpl.pug';
import './button.scss';

interface ISubmitButtonProps {
    className?: string;
    href?: string;
    text: string;
    events?: Record<string, (e: Event) => void>;
}

export class Button extends Block<ISubmitButtonProps> {
    constructor(props: ISubmitButtonProps) {
        super(props.href ? 'a' : 'button', props);
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: `button ${this.props.className || ''}`,
            href: this.props.href || '',
        };
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return this.props.events ? this.props.events : {};
    }

    public render(): DocumentFragment {
        return this.compile(submitButtonTemplate, { text: this.props.text });
    }
}
