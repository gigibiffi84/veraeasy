import type {Dispatch, SetStateAction} from "react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useFreshRef} from "rooks";

// Gets value from sessionStorage
function getValueFromSessionStorage(key: string) {
    if (typeof sessionStorage === "undefined") {
        console.log("axios-interceptor getValueFromSessionStorage undefined", key);
        return null;
    }

    const storedValue = sessionStorage.getItem(key) ?? "null";

    try {
        const parsed = JSON.parse(storedValue);
        console.log("axios-interceptor getValueFromSessionStorage", key, parsed);
        return parsed;
    } catch (error) {
        console.error(error);
        console.log("axios-interceptor getValueFromSessionStorage error", key, error);
    }

    console.log("axios-interceptor getValueFromSessionStorage storedValue", key, storedValue);
    return storedValue;
}

// Saves value to sessionStorage
function saveValueToSessionStorage<S>(key: string, value: S) {
    if (typeof sessionStorage === "undefined") {
        console.log("axios-interceptor saveValueToSessionStorage undefined", key);
        return null;
    }

    if (value === undefined) {
        console.log("axios-interceptor saveValueToSessionStorage value undefined", key);
        return sessionStorage.removeItem(key);
    }

    console.log("axios-interceptor saveValueToSessionStorage", key, JSON.stringify(value));
    sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * @param key Key of the sessionStorage object
 * @param initialState Default initial value
 */
function initialize<S>(key: string, initialState: S | (() => S)) {
    const valueLoadedFromSessionStorage = getValueFromSessionStorage(key);
    if (valueLoadedFromSessionStorage === null) {
        return typeof initialState === "function"
            ? (initialState as () => S)()
            : initialState;
    } else {
        return valueLoadedFromSessionStorage;
    }
}

type UseSessionStorageStateReturnValue<S> = [
    S,
    Dispatch<SetStateAction<S>>,
    () => void
];
type BroadcastCustomEvent<S> = CustomEvent<{ newValue: S }>;

/**
 * useLocalstorageState hook
 * Tracks a value within localStorage and updates it
 *
 * @param {string} key - Key of the localStorage object
 * @param {any} initialState - Default initial value
 * @see https://rooks.vercel.app/docs/useLocalstorageState
 */
function useSessionStorageState<S>(
    key: string,
    initialState?: S | (() => S)
): UseSessionStorageStateReturnValue<S> {
    const [value, setValue] = useState(() => initialize(key, initialState));
    const isUpdateFromCrossDocumentListener = useRef(false);
    const isUpdateFromWithinDocumentListener = useRef(false);
    const customEventTypeName = useMemo(() => {
        return `rooks-${key}-localstorage-update`;
    }, [key]);

    useEffect(() => {
        /**
         * We need to ensure there is no loop of
         * storage events fired. Hence we are using a ref
         * to keep track of whether setValue is from another
         * storage event
         */
        if (
            !isUpdateFromCrossDocumentListener.current ||
            !isUpdateFromWithinDocumentListener.current
        ) {
            saveValueToSessionStorage<S>(key, value);
        }
    }, [key, value]);

    const listenToCrossDocumentStorageEvents = useCallback(
        (event: StorageEvent) => {
            if (event.storageArea === localStorage && event.key === key) {
                try {
                    isUpdateFromCrossDocumentListener.current = true;
                    const newValue = JSON.parse(event.newValue ?? "null");
                    if (value !== newValue) {
                        setValue(newValue);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        [key, value]
    );

    // check for changes across documents
    useEffect(() => {
        // eslint-disable-next-line no-negated-condition
        if (typeof window !== "undefined") {
            window.addEventListener("storage", listenToCrossDocumentStorageEvents);

            return () => {
                window.removeEventListener(
                    "storage",
                    listenToCrossDocumentStorageEvents
                );
            };
        } else {
            console.warn("useSessionStorageState: window is undefined.");

            return () => {
            };
        }
    }, [listenToCrossDocumentStorageEvents]);

    const listenToCustomEventWithinDocument = useCallback(
        (event: BroadcastCustomEvent<S>) => {
            try {
                isUpdateFromWithinDocumentListener.current = true;
                const {newValue} = event.detail;
                if (value !== newValue) {
                    setValue(newValue);
                }
            } catch (error) {
                console.log(error);
            }
        },
        [value]
    );

    // check for changes within document
    useEffect(() => {
        // eslint-disable-next-line no-negated-condition
        if (typeof document !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            document.addEventListener(
                customEventTypeName,
                listenToCustomEventWithinDocument
            );

            return () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                document.removeEventListener(
                    customEventTypeName,
                    listenToCustomEventWithinDocument
                );
            };
        } else {
            console.warn("[useLocalstorageState] document is undefined.");

            return () => {
            };
        }
    }, [customEventTypeName, listenToCustomEventWithinDocument]);

    const broadcastValueWithinDocument = useCallback(
        (newValue: S) => {
            // eslint-disable-next-line no-negated-condition
            if (typeof document !== "undefined") {
                const event: BroadcastCustomEvent<S> = new CustomEvent(
                    customEventTypeName,
                    {detail: {newValue}}
                );
                document.dispatchEvent(event);
            } else {
                console.warn("[useLocalstorageState] document is undefined.");
            }
        },
        [customEventTypeName]
    );

    const currentValue = useFreshRef(value, true);

    const set = useCallback(
        (newValue: SetStateAction<S>) => {
            const resolvedNewValue =
                typeof newValue === "function"
                    ? (newValue as (prevState: S) => S)(currentValue.current)
                    : newValue;
            isUpdateFromCrossDocumentListener.current = false;
            isUpdateFromWithinDocumentListener.current = false;
            setValue(resolvedNewValue);
            broadcastValueWithinDocument(resolvedNewValue);
        },
        [broadcastValueWithinDocument, currentValue]
    );

    const remove = useCallback(() => {
        sessionStorage.removeItem(key);
    }, [key]);

    return [value, set, remove];
}

export {useSessionStorageState};