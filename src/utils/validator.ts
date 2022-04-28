export enum ValidationNames {
    LOGIN,
    NAME,
    EMAIL,
    PASSWORD,
    REPEATED_PASSWORD,
    PHONE,
    MESSAGE,
}

export const validate = (
    validationName: ValidationNames,
    value: string,
    ruleValue?: string
): { isValid: boolean; message: string } => {
    switch (validationName) {
        case ValidationNames.NAME:
            return {
                isValid: /^[A-ZА-Я][a-zA-Zа-яА-Я-]+$/.test(value),
                message:
                    'Введите имя латиницей или кириллицей, первая буква должна быть заглавной',
            };
        case ValidationNames.LOGIN:
            return {
                isValid: /^[\w-]{3,20}[a-zA-Zа-яА-Я]+[0-9]*$/.test(value),
                message: 'Введите логин латиницей от 3 до 20 символов',
            };
        case ValidationNames.MESSAGE:
            return {
                isValid: value.length > 0,
                message: 'Поле не должно быть пустым',
            };
        case ValidationNames.EMAIL:
            return {
                isValid: /^[\w-.]+@[a-zA-Z]+\.[\w-]*$/.test(value),
                message: 'Некорректный email',
            };
        case ValidationNames.PASSWORD:
            return {
                isValid: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/.test(value),
                message:
                    'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
            };
        case ValidationNames.REPEATED_PASSWORD:
            return {
                isValid: value === ruleValue,
                message: 'Пароли не совпадают',
            };
        case ValidationNames.PHONE:
            return {
                isValid: /^[\d+][\d]{10,15}$/.test(value),
                message:
                    'Телефон должен содержать от 10 до 15 символов и состоять из цифр.',
            };
        default:
            return {
                isValid: true,
                message: '',
            };
    }
};
