import {catchError, map, Observable, of} from "rxjs";
import {ContactVerificationType} from "@/api/ContactVerificationTypes.ts";
import {ajax} from "rxjs/ajax";
import {CreatedType} from "@/api/CommonTypes.ts";

export type ContacListFetcherFunction = (text: string) => Observable<ContactVerificationType[]>;

const contactCreated$ = (newContact: ContactVerificationType): Observable<CreatedType> => {
    const url = import.meta.env.VITE_CONTACTS_CREATE_URL;
    return ajax.post<CreatedType>(url, newContact)
        .pipe(
            map(r => r.response),
            catchError(error => {
                console.log('error: ', error);
                return of(error);
            })
        )
}
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

const emptyContactList$ = (): Observable<ContactVerificationType[]> => {
    const result = of([1, 2, 3, 4, 5]).pipe(
        map(slots =>
            slots.map((a) => {
                    return {} as ContactVerificationType
                }
            )
        )
    );
    return result;
}

const api = {
    contactList$,
    emptyContactList$,
    contactCreated$
}
export default api;