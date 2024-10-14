import localFont from 'next/font/local';

export const gilroy = localFont({
    src: [
        {
            path: './Gilroy-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './GilRoy-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './GilRoy-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './GilRoy-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-gilroy',
});
