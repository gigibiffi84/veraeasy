import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {signInReducers, userLoginEpic} from "@/features/signin/UserSignInState";

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
    userLoginEpic
)

const rootReducer = combineReducers({
    signinState: signInReducers
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