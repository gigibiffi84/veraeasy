import {catchError, map, Observable, of, throwError} from "rxjs";
import {ContactVerificationAddressType, ContactVerificationType} from "@/api/ContactVerificationTypes.ts";
import {CreatedType} from "@/api/CommonTypes.ts";
import RxAxios from "./rxAxios.ts";

export type ContacListFetcherFunction = (text: never) => Observable<ContactVerificationType[]>;

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

const contactMailAddressById$ = (guid: string | undefined): Observable<string> => {
    const url = import.meta.env.VITE_GET_CONTACT_ADDRESS_URL;
    const interpolated = `${url}/${guid}`;
    return RxAxios.get<ContactVerificationAddressType>(interpolated)
        .pipe(
            map(r => r.email),
            catchError(error => {
                console.log('error: ', error);
                return throwError(error);
            })
        )
}
const contactList$ = (searchTerm: never): Observable<ContactVerificationType[]> => {

    const url = import.meta.env.VITE_CONTACTS_LIST_URL;
    return RxAxios.get<ContactVerificationType[]>(`${url}/search`, {search: searchTerm})
        .pipe(
            map(r => r),
            catchError(error => {
                console.log('error: ', error);
                return throwError(error);
            })
        )
}

const contactListByOwner$ = (user: string | null | undefined): Observable<ContactVerificationType[]> => {

    const url = import.meta.env.VITE_CONTACTS_LIST_URL;
    return RxAxios.get<ContactVerificationType[]>(`${url}/owner`, {user: user})
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
            slots.map(() => {
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
    contactCreated$,
    contactListByOwner$,
    contactMailAddressById$
}
export default api;