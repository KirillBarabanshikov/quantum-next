import * as yup from 'yup';

export const accountScheme = yup.object().shape({
    username: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(5, 'Логин должен содержать не менее 5 символов')
        .matches(/^[a-zA-Z0-9]+$/, 'Логин может содержать только латинские буквы и цифры'),
    phoneNumber: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(18, 'Недействительный номер телефона'),
    email: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .email('Недействительный адрес электронной почты')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Недействительный адрес электронной почты'),
});

export type TAccountScheme = yup.InferType<typeof accountScheme>;
