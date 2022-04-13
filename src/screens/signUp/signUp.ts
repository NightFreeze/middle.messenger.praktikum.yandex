import Block from '~src/utils/block';
import '../../styles/index.scss';
import './signUp.style.scss';
import '~src/components/atoms/form/form.style.scss';
import '~src/components/atoms/input/input.style.scss';
import '~src/components/atoms/input-validator/input-validator.style.scss';
import '~src/components/atoms/button/button.style.scss';
import registrationTemplate from './signUp.tmpl.pug';
import ValidatedInput from '~src/components/atoms/input-validator/input-validator';
import Input from '~src/components/atoms/input/input';
import Button from '~src/components/atoms/button/button';
import { ValidationNames } from '~src/utils/validator';

interface ILoginProps {
  loginField: Input;
  passwordField: Input;
}

export default class SignUp extends Block<ILoginProps> {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const emailField = new ValidatedInput({
      isValid: false,
      validationName: ValidationNames.EMAIL,
      placeholder: 'Почта',
      name: 'email',
      type: 'email',
      classNames: 'input-field__input',
    });

    const loginField = new ValidatedInput({
      isValid: false,
      validationName: ValidationNames.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      classNames: 'input-field__input',
    });

    const firstNameField = new ValidatedInput({
      isValid: false,
      validationName: ValidationNames.NAME,
      placeholder: 'Имя',
      name: 'first_name',
      type: 'text',
      classNames: 'input-field__input',
    });

    const secondNameField = new ValidatedInput({
      isValid: false,
      validationName: ValidationNames.NAME,
      placeholder: 'Фамилия',
      name: 'second_name',
      type: 'text',
      classNames: 'input-field__input',
    });

    const phoneField = new ValidatedInput({
      isValid: false,
      validationName: ValidationNames.PHONE,
      placeholder: 'Телефон',
      name: 'phone',
      type: 'tel',
      classNames: 'input-field__input',
    });

    const passwordField = new ValidatedInput({
      isValid: false,
      validationName: ValidationNames.PASSWORD,
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
      classNames: 'input-field__input',
    });

    const validatedInputList: ValidatedInput[] = [
      emailField,
      loginField,
      firstNameField,
      secondNameField,
      phoneField,
      passwordField,
    ];

    const submitButton = new Button({
      text: 'Зарегистрироваться',
      className: 'blue',
      events: {
        click: (event) => {
          event.preventDefault();
          validatedInputList.forEach((child) => {
            child.validate();
          });

          // eslint-disable-next-line no-console
          console.log('REGISTRATION_FORM DATA', {
            email: emailField.value,
            login: loginField.value,
            firstName: firstNameField.value,
            secondName: secondNameField.value,
            phone: phoneField.value,
            password: passwordField.value,
          });
        },
      },
    });

    const loginButton = new Button({
      text: 'Войти',
      className: 'white',
      href: '/login',
    });

    return {
      emailField,
      loginField,
      firstNameField,
      secondNameField,
      phoneField,
      passwordField,
      submitButton,
      loginButton,
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
