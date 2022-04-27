import { Block } from '../../utils/block';
import inputTemplate from './input.tmpl.pug';

export interface IInputProps {
    classNames?: string;
    placeholder: string;
    name: string;
    id?: string;
    type: string;
    events?: Record<string, (e: Event) => void>;
}

export class Input extends Block<IInputProps> {
    constructor(props: IInputProps) {
        super('input', props);
    }

    protected getAttributes() {
        return {
            class: `${this.props.classNames || ''}`,
            placeholder: this.props.placeholder,
            id: this.props.id,
            name: this.props.name,
            type: this.props.type,
        };
    }

    public get value(): string {
        return (this.element as HTMLInputElement).value;
    }

    public setValue(value: string) {
        (this.element as HTMLInputElement).value = value;
    }

    protected getEvents() {
        return this.props.events ? this.props.events : {};
    }

    render() {
        return this.compile(inputTemplate);
    }
}
