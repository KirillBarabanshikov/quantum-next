'use client';

import Error from 'next/error';
import { FC } from 'react';

import { useProductDetailsQuery } from '@/entities/product';
import { ProductDetails } from '@/entities/product/ui/ProductDetails';
// import { ProductsCarousel } from '@/widgets';
import { CallBanner } from '@/widgets/Banners';

import styles from './ProductPage.module.scss';

interface IProductPageProps {
    slug: string;
}

export const ProductPage: FC<IProductPageProps> = ({ slug }) => {
    // const { data: product, isError } = useProductDetailsQuery(slug);

    // if (isError) {
    //     return <Error statusCode={404} />;
    // }

    // if (!product) return <></>;

    const product = {
        id: 138,
        articles: [
            {
                id: 149,
                title: '149',
                stock: true,
                domestic: false,
                number: '1',
                price: 100,
                count: 10,
                descriptions: [],
                new: false,
                popular: true,
                images: [
                    {
                        id: 177,
                        image: 'images/article/66fd46bf96072.png',
                    },
                ],
                additionalCharacteristics: [],
                characteristics: [
                    {
                        id: 907,
                        title: 'Тип',
                        value: 'Хороший тип',
                        categoryCharacteristic: {
                            id: 2,
                            title: 'Тип',
                            filterType: 'list-multiple',
                            modification: false,
                            additionalId: '',
                        },
                        modification: true,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 2,
                    },
                    {
                        id: 908,
                        title: 'Производитель',
                        value: 'Стас',
                        categoryCharacteristic: {
                            id: 5,
                            title: 'Производитель',
                            filterType: 'list-multiple',
                            modification: false,
                            additionalId: '',
                        },
                        modification: false,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 5,
                    },
                    {
                        id: 909,
                        title: 'Масса',
                        value: '15',
                        categoryCharacteristic: {
                            id: 4,
                            title: 'Масса',
                            measurement: 'кг',
                            filterType: 'range',
                            modification: false,
                            additionalId: '',
                        },
                        modification: true,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 4,
                    },
                    {
                        id: 910,
                        title: 'Макс. длительность полета',
                        value: '10',
                        categoryCharacteristic: {
                            id: 3,
                            title: 'Макс. длительность полета',
                            measurement: 'мин',
                            filterType: 'range',
                            modification: false,
                            additionalId: '',
                        },
                        modification: false,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 3,
                    },
                ],
            },
            {
                id: 150,
                title: '150',
                stock: true,
                domestic: false,
                number: '2',
                price: 200,
                count: 20,
                descriptions: [],
                new: false,
                popular: true,
                images: [
                    {
                        id: 178,
                        image: 'images/article/66fd46bf966cc.png',
                    },
                ],
                additionalCharacteristics: [],
                characteristics: [
                    {
                        id: 911,
                        title: 'Тип',
                        value: 'Плохой тип',
                        categoryCharacteristic: {
                            id: 2,
                            title: 'Тип',
                            filterType: 'list-multiple',
                            modification: false,
                            additionalId: '',
                        },
                        modification: true,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 2,
                    },
                    {
                        id: 912,
                        title: 'Производитель',
                        value: 'Стас',
                        categoryCharacteristic: {
                            id: 5,
                            title: 'Производитель',
                            filterType: 'list-multiple',
                            modification: false,
                            additionalId: '',
                        },
                        modification: false,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 5,
                    },
                    {
                        id: 913,
                        title: 'Масса',
                        value: '20',
                        categoryCharacteristic: {
                            id: 4,
                            title: 'Масса',
                            measurement: 'кг',
                            filterType: 'range',
                            modification: false,
                            additionalId: '',
                        },
                        modification: true,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 4,
                    },
                    {
                        id: 914,
                        title: 'Макс. длительность полета',
                        value: '10',
                        categoryCharacteristic: {
                            id: 3,
                            title: 'Макс. длительность полета',
                            measurement: 'мин',
                            filterType: 'range',
                            modification: false,
                            additionalId: '',
                        },
                        modification: false,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 3,
                    },
                ],
            },
            {
                id: 151,
                title: '151',
                stock: true,
                domestic: false,
                number: '3',
                price: 300,
                count: 30,
                descriptions: [],
                new: false,
                popular: true,
                images: [
                    {
                        id: 179,
                        image: 'images/article/66fd46bf968b4.png',
                    },
                ],
                additionalCharacteristics: [],
                characteristics: [
                    {
                        id: 915,
                        title: 'Тип',
                        value: 'Хороший тип',
                        categoryCharacteristic: {
                            id: 2,
                            title: 'Тип',
                            filterType: 'list-multiple',
                            modification: false,
                            additionalId: '',
                        },
                        modification: true,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 2,
                    },
                    {
                        id: 916,
                        title: 'Производитель',
                        value: 'Стас',
                        categoryCharacteristic: {
                            id: 5,
                            title: 'Производитель',
                            filterType: 'list-multiple',
                            modification: false,
                            additionalId: '',
                        },
                        modification: false,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 5,
                    },
                    {
                        id: 917,
                        title: 'Масса',
                        value: '20',
                        categoryCharacteristic: {
                            id: 4,
                            title: 'Масса',
                            measurement: 'кг',
                            filterType: 'range',
                            modification: false,
                            additionalId: '',
                        },
                        modification: true,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 4,
                    },
                    {
                        id: 918,
                        title: 'Макс. длительность полета',
                        value: '10',
                        categoryCharacteristic: {
                            id: 3,
                            title: 'Макс. длительность полета',
                            measurement: 'мин',
                            filterType: 'range',
                            modification: false,
                            additionalId: '',
                        },
                        modification: false,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 3,
                    },
                ],
            },
            {
                id: 152,
                title: '152',
                stock: true,
                domestic: false,
                number: '3',
                price: 300,
                count: 30,
                descriptions: [],
                new: false,
                popular: true,
                images: [
                    {
                        id: 179,
                        image: 'images/article/66fd46bf968b4.png',
                    },
                ],
                additionalCharacteristics: [],
                characteristics: [
                    {
                        id: 915,
                        title: 'Тип',
                        value: 'Хороший тип',
                        categoryCharacteristic: {
                            id: 2,
                            title: 'Тип',
                            filterType: 'list-multiple',
                            modification: false,
                            additionalId: '',
                        },
                        modification: true,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 2,
                    },
                    {
                        id: 916,
                        title: 'Производитель',
                        value: 'Стас',
                        categoryCharacteristic: {
                            id: 5,
                            title: 'Производитель',
                            filterType: 'list-multiple',
                            modification: false,
                            additionalId: '',
                        },
                        modification: false,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 5,
                    },
                    {
                        id: 917,
                        title: 'Масса',
                        value: '20',
                        categoryCharacteristic: {
                            id: 4,
                            title: 'Масса',
                            measurement: 'кг',
                            filterType: 'range',
                            modification: false,
                            additionalId: '',
                        },
                        modification: true,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 4,
                    },
                    {
                        id: 918,
                        title: 'Макс. длительность полета',
                        value: '10',
                        categoryCharacteristic: {
                            id: 3,
                            title: 'Макс. длительность полета',
                            measurement: 'мин',
                            filterType: 'range',
                            modification: false,
                            additionalId: '',
                        },
                        modification: false,
                        additional: false,
                        additionalId: '',
                        categoryCharacteristicId: 3,
                    },
                ],
            },
        ],
        additionalCharacteristics: [],
        characteristics: [
            {
                id: 919,
                title: 'Тип',
                value: 'Хороший тип',
                categoryCharacteristic: {
                    id: 2,
                    title: 'Тип',
                    filterType: 'list-multiple',
                    modification: false,
                    additionalId: '',
                },
                modification: true,
                additional: false,
                additionalId: '',
                categoryCharacteristicId: 2,
            },
            {
                id: 920,
                title: 'Производитель',
                value: 'Стас',
                categoryCharacteristic: {
                    id: 5,
                    title: 'Производитель',
                    filterType: 'list-multiple',
                    modification: false,
                    additionalId: '',
                },
                modification: false,
                additional: false,
                additionalId: '',
                categoryCharacteristicId: 5,
            },
            {
                id: 921,
                title: 'Масса',
                value: '15',
                categoryCharacteristic: {
                    id: 4,
                    title: 'Масса',
                    measurement: 'кг',
                    filterType: 'range',
                    modification: false,
                    additionalId: '',
                },
                modification: true,
                additional: false,
                additionalId: '',
                categoryCharacteristicId: 4,
            },
            {
                id: 922,
                title: 'Макс. длительность полета',
                value: '10',
                categoryCharacteristic: {
                    id: 3,
                    title: 'Макс. длительность полета',
                    measurement: 'мин',
                    filterType: 'range',
                    modification: false,
                    additionalId: '',
                },
                modification: false,
                additional: false,
                additionalId: '',
                categoryCharacteristicId: 3,
            },
        ],
        categoryId: 3,
        modifications: [
            {
                title: 'Тип',
                values: [
                    {
                        value: 'Хороший тип',
                        articleId: 149,
                    },
                    {
                        value: 'Плохой тип',
                        articleId: 150,
                    },
                    {
                        value: 'Хороший тип',
                        articleId: 151,
                    },
                ],
            },
            {
                title: 'Масса',
                values: [
                    {
                        value: '15',
                        articleId: 149,
                        measurement: 'кг',
                    },
                    {
                        value: '20',
                        articleId: 150,
                        measurement: 'кг',
                    },
                    {
                        value: '20',
                        articleId: 151,
                        measurement: 'кг',
                    },
                ],
            },
        ],
        colors: [],
    };

    return (
        <div className={styles.productPage}>
            <ProductDetails product={product} />
            {/*<ProductsCarousel title={'Вы смотрели'} className={styles.carousel} />*/}
            <CallBanner />
        </div>
    );
};
