// import axios from 'axios';
import {map, tap} from 'rxjs/operators'
import {catchError, firstValueFrom, Observable, throwError} from 'rxjs'
import {CredentialsType, UserSignInResponseSuccessType} from "@/api/SigninTypes.ts";
import {ajax} from "rxjs/ajax";

const userLogin = (credentials: CredentialsType): Observable<UserSignInResponseSuccessType> => {

    const url = import.meta.env.VITE_LOGIN_URL;
    return ajax.post<UserSignInResponseSuccessType>(url, {
        username: credentials.username,
        password: credentials.password
    }).pipe(
        tap(r => console.log("response is" + r)),
        map(r => r.response),
        catchError(error => {
            console.log('error: ', error);
            return throwError(error.response);
        })
    )
}

const refreshSession = (refreshToken: string): Promise<UserSignInResponseSuccessType> => {

    const url = import.meta.env.VITE_LOGIN_REFRESH_URL;
    return firstValueFrom(ajax.post<UserSignInResponseSuccessType>(url, {
        refresh_token: refreshToken
    }).pipe(
        map(r => r.response),
        catchError(error => {
            console.log('error: ', error);
            return throwError(error.response);
        })
    ))
}

const api = {
    userLogin,
    refreshSession
}
export default api;