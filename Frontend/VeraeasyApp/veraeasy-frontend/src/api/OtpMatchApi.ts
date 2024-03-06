import {catchError, map, Observable, throwError} from "rxjs";
import {CredentialsType, UserSignInResponseSuccessType} from "@/api/SigninTypes.ts";
import {ajax} from "rxjs/ajax";
import {tap} from "rxjs/operators";
import RxAxios from "@/api/rxAxios.ts";
import {OtpEmailVerificationType} from "@/api/ContactVerificationTypes.ts";

const otpLogin$ = (credentials: CredentialsType): Observable<UserSignInResponseSuccessType> => {

    const url = import.meta.env.VITE_OTP_LOGIN_URL;
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

const emailVerificationByUuid$ = (guid: string, token: string): Observable<OtpEmailVerificationType> => {
    const url = import.meta.env.VITE_OTP_GET_EMAIL_VERIFICATION;
    const interpolated = `${url}`;
    return RxAxios.simpleGet<OtpEmailVerificationType>(interpolated, token, {uuid: guid})
        .pipe(
            map(r => r),
            catchError(error => {
                console.log('error: ', error);
                return throwError(error);
            })
        )
}


const api = {
    otpLogin$,
    emailVerificationByUuid$
}
export default api;