export interface ISignInResponse {
    token: string;
}

export interface ISignInBody {
    username: string;
    password: string;
}

export interface ISignUpBody {
    username: string;
    password: string;
    phone: string;
    email: string;
    passwordRepeat: string;
}
