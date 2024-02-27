import {CredentialsType, UserLoginErrorTye, UserType} from "@/types/Types.ts";
import {ofType} from "redux-observable";
import {catchError, map, mergeMap, of} from "rxjs";
import SignInService from "@/features/signin/SignInService.tsx";
import {ActionCreatorWithPayload, createAction, createReducer} from "@reduxjs/toolkit";

export interface SignInState {
    currentUser: UserType,
    loading: boolean,
    fetched: boolean,
    error: string
}

const initialState: SignInState = {
    currentUser: {} as UserType,
    loading: false,
    fetched: false,
    error: ""
};

// action types
const types = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR'
};

//actions

export const requestLoginAction: ActionCreatorWithPayload<CredentialsType, string> = createAction<CredentialsType>(types.LOGIN_REQUEST);
export const loginSuccessAction: ActionCreatorWithPayload<UserType, string> = createAction<UserType>(types.LOGIN_SUCCESS);
export const loginFailuerAction: ActionCreatorWithPayload<UserLoginErrorTye, string> = createAction<UserLoginErrorTye>(types.LOGIN_ERROR);

//reducers


export const signInReducers = createReducer<SignInState>(initialState, (builder) =>
    builder
        .addCase(requestLoginAction, (state, action) => {
            return {
                ...state,
                loading: true
            };
        })
        .addCase(loginSuccessAction, (state, action) => {
            return {
                ...state,
                fetched: true,
                currentUser: action.payload,
                loading: false
            };
        })
        .addCase(loginFailuerAction, (state, action) => {
            return {
                ...state,
                fetched: false,
                currentUser: {username: null},
                loading: false,
                error: action.payload.toString()
            }
        })
);

// Epic
export const userLoginEpic = (action$, store) => action$.pipe(
    ofType(types.LOGIN_REQUEST),
    mergeMap((action) => {
        return SignInService.login(action.payload as CredentialsType).pipe(
            map((response: any) => {
                return loginSuccessAction({username: response.user});
            }),
            catchError(error => {
                return of(loginFailuerAction({error: error.response}));
            }),
        );
    }),
);
