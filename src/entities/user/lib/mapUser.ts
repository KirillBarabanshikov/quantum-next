import { mapProduct } from '@/entities/product';

import { IUser } from '../model';

export function mapUser(user: IUser): IUser {
    return {
        ...user,
        payerProfiles: user.payerProfiles.map((profile) => {
            return {
                ...profile,
                orders: profile.orders.map((order) => {
                    return {
                        ...order,
                        orderArticles: order.orderArticles.map((product) => {
                            return {
                                ...product,
                                article: mapProduct(product.article),
                            };
                        }),
                    };
                }),
            };
        }),
    };
}
