export interface IOrderBody {
    payerProfileId: number;
    deliveryType: string;
    articles: {
        id: number;
        quantity: number;
    }[];
}
