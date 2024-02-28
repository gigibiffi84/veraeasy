// import axios from 'axios';
import {ajax} from 'rxjs/ajax'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {CredentialsType, UserSignInResponseSuccessType} from "@/api/SigninTypes.ts";

const userLogin = (credentials: CredentialsType): Observable<UserSignInResponseSuccessType> => {

    const url = import.meta.env.VITE_LOGIN_URL;
    return ajax.post<UserSignInResponseSuccessType>(url, {
        email: credentials.username,
        password: credentials.password
    }).pipe(map(r => r.response));
}

const api = {
    userLogin
}
export default api;