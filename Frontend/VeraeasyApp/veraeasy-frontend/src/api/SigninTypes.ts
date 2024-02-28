export type UserType = {
    username: string | null | undefined;
}

export type UserSignInResponseSuccessType = {
    "accessToken": string,
    "user": {
        "email": string,
        "id": number
    }
}

export type UserLoginErrorType = {
    error: string | null | undefined;
}

export type CredentialsType = {
    username: string | null | undefined;
    password: string;
}