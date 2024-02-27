import {CredentialsType} from "@/types/Types.ts";
// import axios from 'axios';
import {ajax} from 'rxjs/ajax'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'

const userLogin = (credentials: CredentialsType): Observable<unknown> => {

    const url = import.meta.env.VITE_LOGIN_URL;
    return ajax.post(url, {email: credentials.username, password: credentials.password}).pipe(map(r => r.response));
}

const api = {
    userLogin
}
export default api;