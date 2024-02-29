import SearchInput from "@/components/SearchInput.tsx";
import {useObservable, useSubscription} from "observable-hooks";
import {catchError, distinctUntilChanged, filter, map, startWith, switchMap} from "rxjs/operators";
import {SearchContactInputProps} from "@/types/Types.ts";
import {of, timer} from "rxjs";

export default function StatefulSearchInput({
                                                inputText,
                                                onSearch,
                                                fetcherFunction,
                                                cancelFunction,
                                                onSearchResultComplete
                                            }: SearchContactInputProps) {

    const status$ = useObservable(input$ =>
            input$.pipe(
                distinctUntilChanged((a, b) => a[0] === b[0]),
                //filter(([test, fn]) => test.length > 0),
                //tap(([test, fn]) => console.log(">>> after test filter", test)),
                switchMap(([text, fetchFunc]) =>
                    text && text.length > 3 ?
                        timer(2000).pipe(
                            filter(() => text.length > 3),
                            switchMap(() => fetchFunc(text)),
                            map(contacts => contacts),
                            catchError((err) => of({error: err})),
                            startWith({state: "loading"}),
                        )
                        : // cancel handling response, reset default state
                        timer(500).pipe(
                            switchMap(() => of({state: "default"}))
                        )
                )),
        [inputText, fetcherFunction]);

    //const reactiveState = useObservableState(status$, () => []);

    useSubscription(status$, onSearchResultComplete);


    return (
        <div className="flex flex-col w-full max-w-lg items-center ">
            <SearchInput enableFocus={true} inputText={inputText} onSearch={onSearch}></SearchInput>
        </div>
    )
}