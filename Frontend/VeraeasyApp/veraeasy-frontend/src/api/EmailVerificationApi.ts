import {catchError, map, Observable, throwError} from "rxjs";
import RxAxios from "@/api/rxAxios.ts";

const emailVerificationCreated$ = (emailAddress: string): Observable<object> => {
    const url = import.meta.env.VITE_EMAIL_VERIFICATION_CREATE_URL;

    return RxAxios.post<object>(url, {email: emailAddress})
        .pipe(
            map(r => r),
            catchError(error => {
                console.log('error: ', error);
                return throwError(error);
            })
        )
}

const api = {
    emailVerificationCreated$
}
export default api;