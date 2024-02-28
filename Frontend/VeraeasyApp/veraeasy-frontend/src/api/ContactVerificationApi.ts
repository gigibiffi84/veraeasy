import {catchError, map, Observable, of} from "rxjs";
import {ContactVerificationType} from "@/api/ContactVerificationTypes.ts";
import {ajax} from "rxjs/ajax";

export type ContacListFetcherFunction = (text: string) => Observable<ContactVerificationType[]>;

const contactList$ = (): Observable<ContactVerificationType[]> => {

    const url = import.meta.env.VITE_CONTACTS_LIST_URL;
    return ajax.get<ContactVerificationType[]>(url)
        .pipe(
            map(r => r.response),
            catchError(error => {
                console.log('error: ', error);
                return of(error);
            })
        )
}

const api = {
    contactList$
}
export default api;