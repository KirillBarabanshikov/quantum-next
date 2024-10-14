import * as yup from 'yup';

export const orderCallScheme = yup.object().shape({
    name: yup.string().required('Пожалуйста, заполните обязательное поле'),
    phone: yup.string().required('Пожалуйста, заполните обязательное поле').min(18, 'Недействительный номер телефона'),
});

export type TOrderCallScheme = yup.InferType<typeof orderCallScheme>;
