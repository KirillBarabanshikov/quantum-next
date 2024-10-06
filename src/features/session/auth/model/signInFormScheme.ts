import * as yup from 'yup';

export const signInFormScheme = yup.object().shape({
    username: yup.string().required('Пожалуйста, заполните обязательное поле'),
    password: yup.string().required('Пожалуйста, заполните обязательное поле'),
});

export type TSignInFormScheme = yup.InferType<typeof signInFormScheme>;
