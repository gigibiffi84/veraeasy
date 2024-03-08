import {defer, mergeMap, Observable} from 'rxjs';
import initializeAxios from './axiosSetup';
import simpleSetup from './simpleAxiosSetup.ts';
import {axiosRequestConfiguration} from './config';
import {map} from 'rxjs/operators';
import {fromPromise} from "rxjs/internal/observable/innerFrom";

const axiosInstance = initializeAxios(axiosRequestConfiguration);
const simpleAxiosInstance = simpleSetup(axiosRequestConfiguration);

const get = <T>(url: string, queryParams?: object): Observable<T> => {
    return defer(() => axiosInstance.get<T>(url, {params: queryParams}))
        .pipe(map(result => result.data));
};

const simpleGet = <T>(url: string, token: string, queryParams?: object): Observable<T> => {
    return defer(
        () => simpleAxiosInstance.get<T>(url, {
            params: queryParams,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }))
        .pipe(map(result => result.data));
};

const simplePut = <T>(url: string, token: string, body: object, queryParams?: object): Observable<T> => {
    return defer(() => simpleAxiosInstance.put<T>(url, body, {
        params: queryParams,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }))
        .pipe(map(result => result.data));
};

const simplePost = <T>(url: string, body: object, queryParams?: object): Observable<T> => {
    return defer(() => simpleAxiosInstance.post<T>(url, body, {
        params: queryParams,
        headers: {
            "Content-type": "application/json"
        }
    }))
        .pipe(map(result => result.data));
};

const post = <T>(url: string, body: object, queryParams?: object): Observable<T> => {
    return defer(() => axiosInstance.post<T>(url, body, {
        params: queryParams,
        headers: {
            "Content-type": "application/json"
        }
    }))
        .pipe(map(result => result.data));
};

const fetchAsPost = <T>(url: string, body: object): Observable<T> => {
    return defer(() => fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        }
    )).pipe(mergeMap((result) => fromPromise<T>(result.json())))
}

const put = <T>(url: string, body: object, queryParams?: object): Observable<T> => {
    return defer(() => axiosInstance.put<T>(url, body, {params: queryParams}))
        .pipe(map(result => result.data));
};


const patch = <T>(url: string, body: object, queryParams?: object): Observable<T> => {
    return defer(() => axiosInstance.patch<T>(url, body, {params: queryParams}))
        .pipe(map(result => result.data));
};

const deleteR = <T>(url: string, id: number): Observable<T> => {
    return defer(() => (axiosInstance.delete(`${url}/${id}`)))
        .pipe(map(result => result.data)
        );
};

export default {simplePost, simpleGet, simplePut, get, post, put, patch, delete: deleteR, fetchAsPost};