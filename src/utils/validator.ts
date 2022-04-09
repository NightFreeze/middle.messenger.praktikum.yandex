export enum VALIDATION_NAMES {
  LOGIN,
  NAME,
  EMAIL,
  PASSWORD,
  REPEATED_PASSWORD,
  PHONE,
  MESSAGE,
}

export const validate = (
  validationName: VALIDATION_NAMES,
  value: string,
  ruleValue?: string,
): { isValid: boolean, message: string } => {
  switch (validationName) {
    case VALIDATION_NAMES.NAME:
      return {
        isValid: /^[A-ZА-Я][a-zA-Zа-яА-Я-]+$/.test(value),
        message: 'Введите имя латиницей или кириллицей, первая буква должна быть заглавной',
      };
    case VALIDATION_NAMES.LOGIN:
      return {
        isValid: /^[\w-]{3,20}[a-zA-Zа-яА-Я]+[0-9]*$/.test(value),
        message: 'Введите логин латиницей от 3 до 20 символов',
      };
    case VALIDATION_NAMES.MESSAGE:
      return {
        isValid: value.length > 0,
        message: 'Сообщение не должно быть пустым',
      };
    case VALIDATION_NAMES.EMAIL:
      return {
        isValid: /^[\w-.]+@[a-zA-Z]+\.[\w-]*$/.test(value),
        message: 'Некорректный email',
      };
    case VALIDATION_NAMES.PASSWORD:
      return {
        isValid: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/.test(value),
        message: 'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      };
    case VALIDATION_NAMES.REPEATED_PASSWORD:
      return {
        isValid: value === ruleValue,
        message: 'Пароли не совпадают',
      };
    case VALIDATION_NAMES.PHONE:
      return {
        isValid: /^[\d+][\d]{10,15}$/.test(value),
        message: 'Телефон должен содержать от 10 до 15 символов и состоять из цифр.',
      };
    default:
      return {
        isValid: true,
        message: '',
      };
  }
};
