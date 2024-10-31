import { IOrder } from '@/entities/order';

export interface IUser {
    id: number;
    username: string;
    phoneNumber: string;
    email: string;
    productFavorites: any[];
    payerProfiles: IProfile[];
    cart: any[];
}

export interface IProfile {
    id: number;
    type: 'individual' | 'legal' | 'entrepreneur';
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    passportSeries: string;
    passportNumber: string;
    passportIssued: string;
    passportDepartmentCode: string;
    passportDate: Date;
    deliveryAddressCity: string;
    deliveryAddress: string;
    inn: null;
    ogrn: null;
    addressLegal: null;
    addressPhysical: null;
    bankAccount: null;
    correspondentAccount: null;
    bik: null;
    bankName: null;
    orders: IOrder[];
}
