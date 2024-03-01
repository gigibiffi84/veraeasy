import {ofType} from "redux-observable";
import {catchError, map, mergeMap, of} from "rxjs";
import SignInService from "@/features/signin/SignInService.tsx";
import {ActionCreatorWithPayload, createAction, createReducer} from "@reduxjs/toolkit";
import {CredentialsType, UserLoginErrorType, UserSignInResponseSuccessType} from "@/api/SigninTypes";

export interface SignInState {
    currentUser: string,
    currentToken?: UserSignInResponseSuccessType,
    loading: boolean,
    fetched: boolean,
    error: string | null | undefined
}

const initialState: SignInState = {
    currentUser: "",
    loading: false,
    fetched: false,
    error: "",
    currentToken: {}
};

// action types
const types = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR'
};

//actions

export const requestLoginAction: ActionCreatorWithPayload<CredentialsType, string> = createAction<CredentialsType>(types.LOGIN_REQUEST);
export const loginSuccessAction: ActionCreatorWithPayload<UserSignInResponseSuccessType, string> = createAction<UserSignInResponseSuccessType>(types.LOGIN_SUCCESS);
export const loginFailuerAction: ActionCreatorWithPayload<UserLoginErrorType, string> = createAction<UserLoginErrorType>(types.LOGIN_ERROR);

//reducers
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export const signInReducers = createReducer<SignInState>(initialState, (builder) =>
    builder
        .addCase(requestLoginAction, (state, action) => {
            return {
                ...state,
                loading: true,
                currentUser: action.payload.username as string,
                error: null,
                fetched: false
            };
        })
        .addCase(loginSuccessAction, (state, action) => {
            return {
                ...state,
                fetched: true,
                currentToken: {
                    access_token: action.payload.access_token,
                    id_token: action.payload.id_token,
                    refresh_token: action.payload.refresh_token
                },
                loading: false,
                error: null
            };
        })
        .addCase(loginFailuerAction, (state, action) => {
            return {
                ...state,
                fetched: false,
                currentUser: "",
                currentToken: {},
                loading: false,
                error: action.payload.error as string
            }
        })
);

// Epic
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userLoginEpic = (action$, store) => action$.pipe(
    ofType(types.LOGIN_REQUEST),
    mergeMap((action) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return SignInService.login(action.payload as CredentialsType).pipe(
            map((response: UserSignInResponseSuccessType) => {
                return loginSuccessAction(response);
            }),
            catchError(error => {
                return of(loginFailuerAction({error: error}));
            }),
        );
    }),
);
