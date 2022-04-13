import Block from '~src/utils/block';
import '../../styles/index.scss';
import './signIn.style.scss';
import '~src/components/atoms/form/form.style.scss';
import '~src/components/atoms/input/input.style.scss';
import '~src/components/atoms/input-validator/input-validator.style.scss';
import '~src/components/atoms/button/button.style.scss';
import loginTemplate from './signIn.tmpl.pug';
import ValidatedInput from '~src/components/atoms/input-validator/input-validator';
import Input from '~src/components/atoms/input/input';
import Button from '~src/components/atoms/button/button';
import { ValidationNames } from '~src/utils/validator';

interface ILoginProps {
  loginField: Input;
  passwordField: Input;
}

export default class SignIn extends Block<ILoginProps> {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const loginField = new ValidatedInput({
      isValid: false,
      validationName: ValidationNames.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
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

    const submitButton = new Button({
      text: 'Войти',
      className: 'blue',
      events: {
        click: (event) => {
          event.preventDefault();
          loginField.validate();
          passwordField.validate();

          // eslint-disable-next-line no-console
          console.log('LOGIN_FORM DATA', {
            login: loginField.value,
            password: passwordField.value,
          });
        },
      },
    });

    const registrationButton = new Button({
      text: 'Зарегистрироваться',
      className: 'white',
      href: '/registration',
    });

    return {
      loginField,
      passwordField,
      submitButton,
      registrationButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'main',
    };
  }

  public render(): DocumentFragment {
    return this.compile(loginTemplate);
  }
}
