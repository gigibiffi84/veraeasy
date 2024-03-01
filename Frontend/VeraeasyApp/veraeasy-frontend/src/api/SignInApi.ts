// import axios from 'axios';
import {map, tap} from 'rxjs/operators'
import {catchError, Observable, throwError} from 'rxjs'
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

const api = {
    userLogin
}
export default api;