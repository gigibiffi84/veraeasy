import {ContactVerificationType, CreateContactVerificationType} from "@/api/ContactVerificationTypes.ts";
import {ActionCreatorWithPayload, createAction, createReducer} from "@reduxjs/toolkit";
import {CreatedType, ErrorMsgType} from "@/api/CommonTypes.ts";
import {ofType} from "redux-observable";
import {catchError, map, mergeMap, of, OperatorFunction} from "rxjs";
import ContactVerificationService from "@/features/createcontact/CreateContactService.ts";


export interface CreateContactState {
    newContact: CreateContactVerificationType,
    loading: boolean,
    fetched: boolean,
    error: string | null | undefined
}

const initialState: CreateContactState = {
    newContact: {},
    loading: false,
    fetched: false,
    error: "",
};

const types = {
    CREATE_CONTACT_REQUEST: 'CREATE_CONTACT_REQUEST',
    CONTACT_CREATED: 'CONTACT_CREATED',
    CONTACT_NOT_CREATED: 'CONTACT_NOT_CREATED'
};

export const createNewContactAction: ActionCreatorWithPayload<CreateContactVerificationType, string> = createAction<CreateContactVerificationType>(types.CREATE_CONTACT_REQUEST);
export const contactCreatedAction: ActionCreatorWithPayload<CreatedType, string> = createAction<CreatedType>(types.CONTACT_CREATED);
export const contactNotCreatedAction: ActionCreatorWithPayload<ErrorMsgType, string> = createAction<ErrorMsgType>(types.CONTACT_NOT_CREATED);


export const createContactReducer = createReducer<CreateContactState>(initialState, (builder) =>
    builder
        .addCase(createNewContactAction, (state, action) => {
            return {
                ...state,
                loading: true,
                newContact: action.payload,
                error: null,
                fetched: false
            };
        })
        .addCase(contactCreatedAction, (state, action) => {
            return {
                ...state,
                fetched: true,
                newContact: {...state.newContact, id: action.payload.uuid},
                loading: false,
                error: null
            };
        })
        .addCase(contactNotCreatedAction, (state, action) => {
            return {
                ...state,
                fetched: true,
                newContact: {...state.newContact},
                loading: false,
                error: action.payload.error
            }
        })
);

export const createContactEpic = (action$: {
    pipe: (arg0: OperatorFunction<unknown, never>, arg1: OperatorFunction<unknown, {
        payload: CreatedType;
        type: string;
    } | { payload: ErrorMsgType; type: string; }>) => never;
}) => action$.pipe(
    ofType(types.CREATE_CONTACT_REQUEST),
    mergeMap((action) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return ContactVerificationService.create(action.payload as ContactVerificationType).pipe(
            map((response: CreatedType) => {
                return contactCreatedAction(response);
            }),
            catchError(error => {
                return of(contactNotCreatedAction({error: error.message}));
            }),
        );
    }),
);