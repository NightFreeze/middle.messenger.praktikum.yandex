import { Block } from '~src/utils/block';
import { Button } from '~src/components/button/button';
import ValidatedInput from '~src/components/input-validator/input-validator';
import { ValidationNames } from '~src/utils/validator';
import { connect } from '~src/utils/connect';
import { CreateChatFormController } from './create-chat-form.controller';
import createChatFormTemplate from './create-chat-form.tmpl.pug';
import './create-chat-form.scss';

const withStore = connect((state) => ({
    createChatReq: { ...state.createChatReq },
}));

export class CreateChatForm extends Block {
    createChatFormController;

    constructor() {
        super('div');

        this.createChatFormController = new CreateChatFormController();
    }

    protected getChildren(): Record<string, Block> {
        const titleField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.MESSAGE,
            placeholder: 'Название чата',
            name: 'title',
            type: 'text',
            classNames: 'input-field__input',
        });

        const submitButton = new Button({
            text: 'Создать чат',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();

                    this.createChatFormController.create({
                        title: titleField.value,
                    });
                },
            },
        });

        return {
            titleField,
            submitButton,
        };
    }

    public render() {
        return this.compile(createChatFormTemplate);
    }
}

export default withStore(CreateChatForm);
