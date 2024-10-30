import * as yup from 'yup';

export const individualFormScheme = yup.object().shape({
    firstName: yup.string().required('Пожалуйста, заполните обязательное поле'),
    lastName: yup.string().required('Пожалуйста, заполните обязательное поле'),
    phoneNumber: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .min(18, 'Недействительный номер телефона'),
    email: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .email('Недействительный адрес электронной почты')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Недействительный адрес электронной почты'),
    passportSeries: yup.string().required('Пожалуйста, заполните обязательное поле').min(4).max(4),
    passportNumber: yup.string().required('Пожалуйста, заполните обязательное поле').min(6).max(6),
    passportIssued: yup.string().required('Пожалуйста, заполните обязательное поле'),
    passportDepartmentCode: yup.string().required('Пожалуйста, заполните обязательное поле'),
    passportDate: yup.string().required('Пожалуйста, заполните обязательное поле'),
    deliveryAddressCity: yup.string().required('Пожалуйста, заполните обязательное поле'),
    deliveryAddress: yup.string().required('Пожалуйста, заполните обязательное поле'),
    checked: yup.bool().oneOf([true]),
});

export type TIndividualFormScheme = yup.InferType<typeof individualFormScheme>;
