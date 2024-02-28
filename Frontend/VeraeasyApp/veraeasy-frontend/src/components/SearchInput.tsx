import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Icons} from "@/components/icons.tsx";
import {pluckCurrentTargetValue, useObservableCallback, useSubscription} from "observable-hooks";
import {SearchInputProps} from "@/types/Types.ts";
import {ContactVerificationType} from "@/api/ContactVerificationTypes.ts";

export type OnSearchFunction = (search: string) => void;

export type OnSearchCompleteFunction = (searchResult:
                                            ContactVerificationType[] |
                                            { error: string; } |
                                            { state: string; }) => void;

export default function SearchInput({inputText, onSearch}: SearchInputProps) {

    const [onChange, textChange$] = useObservableCallback<
        string,
        React.FormEvent<HTMLInputElement>
    >(pluckCurrentTargetValue);

    useSubscription(textChange$, onSearch);

    return (
        <div className="flex flex-col w-full max-w-lg items-center ">
            <div className="flex w-full max-w-lg items-center gap-1.5">
                <Label htmlFor="email"> <Icons.search></Icons.search></Label>
                <Input value={inputText} onChange={onChange} type="text"
                       placeholder="Try search by email or mobile number..."/>

            </div>
        </div>
    )
}