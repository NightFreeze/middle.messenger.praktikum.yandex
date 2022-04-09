import Block from '~src/utils/block';
import '../index.scss';
import './profile.style.scss';
import '~src/components/atoms/form/form.style.scss';
import '~src/components/atoms/input/input.style.scss';
import '~src/components/atoms/input-validator/input-validator.style.scss';
import '~src/components/atoms/button/button.style.scss';
import registrationTemplate from './profile.pug';
import ValidatedInput from '~src/components/atoms/input-validator/input-validator';
import Button from '~src/components/atoms/button/button';
import { VALIDATION_NAMES } from '~src/utils/validator';

export default class Profile extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const emailField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.EMAIL,
      placeholder: 'Почта',
      name: 'email',
      type: 'email',
      classNames: 'input-field__input',
    });

    const loginField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      classNames: 'input-field__input',
    });

    const firstNameField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Имя',
      name: 'first_name',
      type: 'text',
      classNames: 'input-field__input',
    });

    const secondNameField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.NAME,
      placeholder: 'Фамилия',
      name: 'second_name',
      type: 'text',
      classNames: 'input-field__input',
    });

    const phoneField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.PHONE,
      placeholder: 'Телефон',
      name: 'phone',
      type: 'tel',
      classNames: 'input-field__input',
    });

    const oldPasswordField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.PASSWORD,
      placeholder: 'Пароль',
      name: 'oldPassword',
      type: 'password',
      classNames: 'input-field__input',
    });

    const newPasswordField = new ValidatedInput({
      isValid: false,
      validationName: VALIDATION_NAMES.PASSWORD,
      placeholder: 'Пароль',
      name: 'newPassword',
      type: 'password',
      classNames: 'input-field__input',
    });

    const validatedInputList: ValidatedInput[] = [
      emailField,
      loginField,
      firstNameField,
      secondNameField,
      phoneField,
      oldPasswordField,
      newPasswordField,
    ];

    const submitButton = new Button({
      text: 'Сохранить',
      className: 'blue',
      events: {
        click: (event) => {
          event.preventDefault();
          validatedInputList.forEach((input) => {
            input.validate();
          });

          // eslint-disable-next-line no-console
          console.log('PROFILE_FORM DATA', {
            email: emailField.value,
            login: loginField.value,
            firstName: firstNameField.value,
            secondName: secondNameField.value,
            phone: phoneField.value,
          });
        },
      },
    });

    return {
      emailField,
      loginField,
      firstNameField,
      secondNameField,
      phoneField,
      submitButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'main',
    };
  }

  public render(): DocumentFragment {
    return this.compile(registrationTemplate);
  }
}
