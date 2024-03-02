import {catchError, map, Observable, of, throwError} from "rxjs";
import {ContactVerificationType} from "@/api/ContactVerificationTypes.ts";
import {CreatedType} from "@/api/CommonTypes.ts";
import RxAxios from "./rxAxios.ts";

export type ContacListFetcherFunction = (text: string) => Observable<ContactVerificationType[]>;

const contactCreated$ = (newContact: ContactVerificationType): Observable<CreatedType> => {
    const url = import.meta.env.VITE_CONTACTS_CREATE_URL;

    return RxAxios.post<CreatedType>(url, newContact)
        .pipe(
            map(r => r),
            catchError(error => {
                console.log('error: ', error);
                return throwError(error);
            })
        )
}
const contactList$ = (): Observable<ContactVerificationType[]> => {

    const url = import.meta.env.VITE_CONTACTS_LIST_URL;
    return RxAxios.get<ContactVerificationType[]>(url)
        .pipe(
            map(r => r),
            catchError(error => {
                console.log('error: ', error);
                return throwError(error);
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