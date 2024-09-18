export interface IResponseSignUp {
    id: number;
}

export interface IRequestSignUpBody {
    username: string;
    password: string;
    phone: string;
    email: string;
    passwordRepeat: string;
}

export interface IResponseSignIn {
    token: string;
}

export interface IRequestSignInBody {
    username: string;
    password: string;
}
