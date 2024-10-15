import * as yup from 'yup';

export const recoverScheme = yup.object().shape({
    contact: yup
        .string()
        .test(
            'is-email-or-phone',
            'Введите валидный email или телефон',
            (value) =>
                yup
                    .string()
                    .email('Недействительный адрес электронной почты')
                    .matches(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        'Недействительный адрес электронной почты',
                    )
                    .isValidSync(value) ||
                yup
                    .string()
                    .matches(/^\+?[1-9]\d{1,14}$/, 'Недействительный номер телефона')
                    .isValidSync(value),
        )
        .required('Пожалуйста, заполните обязательное поле'),
});

export type TRecoverScheme = yup.InferType<typeof recoverScheme>;
