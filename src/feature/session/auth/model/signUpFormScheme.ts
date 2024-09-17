import * as yup from 'yup';

export const signUpFormScheme = yup.object().shape({
    username: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(5, 'Логин должен содержать не менее 5 символов')
        .matches(/^[a-zA-Z0-9]+$/, 'Логин может содержать только латинские буквы и цифры'),
    phone: yup.string().required('Пожалуйста, заполните обязательное поле').min(18, 'Недействительный номер телефона'),
    email: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .email('Недействительный адрес электронной почты'),
    password: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(6, 'Пароль должен содержать не менее 6 символов')
        .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
        .oneOf([yup.ref('passwordRepeat')], 'Пароли должны совпадать'),
    passwordRepeat: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(6, 'Пароль должен содержать не менее 6 символов')
        .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export type TSignUpFormScheme = yup.InferType<typeof signUpFormScheme>;
