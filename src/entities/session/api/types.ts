// export interface IResponseSignUp {
//     id: number;
// }
//
// export interface IRequestSignUpBody {
//     username: string;
//     password: string;
//     phone: string;
//     email: string;
//     passwordRepeat: string;
// }

export interface ISignInResponse {
    token: string;
}

export interface ISignInBody {
    username: string;
    password: string;
}
