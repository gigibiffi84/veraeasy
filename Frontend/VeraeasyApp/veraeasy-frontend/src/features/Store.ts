import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {signInReducers, userLoginEpic} from "@/features/signin/UserSignInState";
import {createContactEpic, createContactReducer} from "@/features/createcontact/CreateContactState.tsx";

const epicMiddleware = createEpicMiddleware();


const rootEpic = combineEpics(
    userLoginEpic,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    createContactEpic
)

const rootReducer = combineReducers({
    signinState: signInReducers,
    createContact: createContactReducer
})
export const RootStore = configureStore({
    reducer: {
        rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware),
    devTools: true
});

epicMiddleware.run(rootEpic);

// Inferred state type: {todos: TodosState, counter: CounterState}
export type RootState = ReturnType<typeof RootStore.getState>

// Inferred dispatch type: Dispatch & ThunkDispatch<RootState, undefined, UnknownAction>
export type AppDispatch = typeof RootStore.dispatch