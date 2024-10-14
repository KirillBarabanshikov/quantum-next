import * as yup from 'yup';

export const leaveQuestionScheme = yup.object().shape({
    name: yup.string().required('Пожалуйста, заполните обязательное поле'),
    email: yup
        .string()
        .required('Пожалуйста, заполните обязательное поле')
        .email('Недействительный адрес электронной почты')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Недействительный адрес электронной почты'),
    question: yup.string().required('Пожалуйста, заполните обязательное поле'),
});

export type TLeaveQuestionScheme = yup.InferType<typeof leaveQuestionScheme>;
