import * as yup from 'yup';

const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            resolve(video.duration);
        };

        video.src = URL.createObjectURL(file);
    });
};

export const createReviewScheme = yup.object().shape({
    rating: yup.number().required('Пожалуйста, заполните рейтинг'),
    pros: yup.string().max(5000, 'Должно быть не более 5000 символов'),
    cons: yup.string().max(5000, 'Должно быть не более 5000 символов'),
    comment: yup
        .string()
        .max(5000, 'Должно быть не более 5000 символов')
        .required('Пожалуйста, заполните обязательное поле'),
    images: yup
        .mixed<FileList>()
        // .test('fileSize', 'Each file must be less than 2MB', (value) => {
        //     return Array.from(value || []).every((file: File) => file.size <= 2000000);
        // })
        .test('fileFormat', 'Only PNG or JPEG formats are allowed', (value) => {
            return Array.from(value || []).every((file: File) =>
                ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type),
            );
        })
        .test('maxFiles', 'You can upload up to 10 images', (value) => {
            return value && value.length <= 10;
        }),
    videos: yup
        .mixed<FileList>()
        .test('fileSize', 'Each video must be less than 200MB', (value) => {
            return Array.from(value || []).every((file: File) => file.size <= 200000000); // 200MB
        })
        .test('fileFormat', 'Only MP4, WebM, or AVI formats are allowed', (value) => {
            return Array.from(value || []).every((file: File) =>
                ['video/mp4', 'video/webm', 'video/avi'].includes(file.type),
            );
        })
        .test('maxFiles', 'You can upload up to 3 videos', (value) => {
            return value && value.length <= 3;
        })
        .test('duration', 'Each video must be less than or equal to 10 minutes', async (value) => {
            const durationChecks = await Promise.all(
                Array.from(value || []).map((file: File) => getVideoDuration(file)),
            );
            return durationChecks.every((duration) => duration <= 600);
        }),
});

export type TCreateReviewScheme = yup.InferType<typeof createReviewScheme>;
