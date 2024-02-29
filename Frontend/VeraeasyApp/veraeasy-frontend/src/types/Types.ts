import {UseFormReturn} from "react-hook-form";
import {OnSearchCompleteFunction, OnSearchFunction} from "@/components/SearchInput.tsx";
import {CredentialsType} from "@/api/SigninTypes.ts";
import {ContacListFetcherFunction} from "@/api/ContactVerificationApi.ts";

export interface SearchInputProps {
    inputText: string;
    onSearch: OnSearchFunction;
    enableFocus: boolean;
}

export interface SearchContactInputProps {
    inputText: string;
    onSearch: OnSearchFunction;
    onSearchResultComplete: OnSearchCompleteFunction;
    cancelFunction: ContacListFetcherFunction;
    fetcherFunction: ContacListFetcherFunction;

}

export type FormFieldProps = {
    type: string;
    label: string;
    name: string;
    form: UseFormReturn<{ username: string, password: string }>;
    children: React.JSX.Element;
    editable: boolean;
};

export type ContactFormFieldProps = {
    type: string;
    label: string;
    name: string;
    form: UseFormReturn<{ dossierId: string, personId: string, email: string, mobileNumber: string }>;
    editable: boolean;
};

export type LoginContext = {
    user: string | null | undefined;
    login: (data: CredentialsType) => Promise<void>,
    logout: () => void
}

