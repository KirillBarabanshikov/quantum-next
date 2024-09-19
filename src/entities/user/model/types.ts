export interface IUser {
    id: number;
    username: string;
    phoneNumber: string;
    email: string;
    productFavorites: any[];
    payerProfiles: IUserProfile[];
}

export interface IUserProfile {
    id: number;
    type: TUserProfileType;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    passportSeries: string;
    passportNumber: string;
    passportIssued: string;
    passportDepartmentCode: string;
    passportDate: string;
    deliveryAddressCity: string;
    deliveryAddress: string;
    orders: any[];
}

export type TUserProfileType = 'individual' | 'legal' | 'entrepreneur';
