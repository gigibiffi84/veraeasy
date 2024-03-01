export type UserType = {
    username: string | null | undefined;
}

export type UserSignInResponseSuccessType = {
    access_token?: string,
    id_token?: string,
    refresh_token?: string

}

export type UserLoginErrorType = {
    error: string | null | undefined;
}

export type CredentialsType = {
    username: string | null | undefined;
    password: string;
}