import { Block } from '~src/utils/block';
import { validate, ValidationNames } from '~src/utils/validator';
import { Input, IInputProps } from '../input/input';
import inputValidatorTemplate from './input-validator.tmpl.pug';

interface IValidatedInputProps extends IInputProps {
    isValid: boolean;
    id?: string;
    validationName?: ValidationNames;
    validationMessage?: string;
    withoutValidationMessage?: boolean;
}

export default class ValidatedInput extends Block<IValidatedInputProps> {
    constructor(props: IValidatedInputProps) {
        super('label', props);
    }

    protected getChildren(): Record<string, Block<IInputProps>> {
        const loginField = new Input({
            ...this.props,
            events: {
                blur: this.validate.bind(this),
            },
        });

        return {
            loginField,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'input-field validated-input',
        };
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return this.props?.events || {};
    }

    public get value(): string {
        return this.children.loginField.value;
    }

    public setValue(value: string) {
        this.children.loginField.setValue(value);
    }

    public validate(referenceValue?: string) {
        const { validationName, withoutValidationMessage } = this.props;
        const { isValid, message } = validate(
            validationName,
            this.children.loginField.value,
            referenceValue
        );
        this.setProps({
            validationMessage:
                isValid || withoutValidationMessage ? '' : message,
        });
    }

    public render(): DocumentFragment {
        return this.compile(inputValidatorTemplate, {
            loginValidationMessage: this.props.validationMessage || '',
        });
    }
}
