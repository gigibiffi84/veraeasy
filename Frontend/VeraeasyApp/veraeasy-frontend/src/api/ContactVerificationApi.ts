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
    emptyContactList$
}
export default api;