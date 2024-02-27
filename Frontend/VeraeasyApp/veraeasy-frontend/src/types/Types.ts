import {UseFormReturn} from "react-hook-form";

export type FormFieldProps = {
    type: string;
    label: string;
    name: string;
    form: UseFormReturn<{ username: string, password: string }>;
    children: React.JSX.Element;
    disabled: boolean;
};

export type LoginContext = {
    user: string | null | undefined;
    login: (data: CredentialsType) => Promise<void>,
    logout: () => void
}

export type UserType = {
    username: string | null | undefined;
}

export type UserLoginErrorTye = {
    error: string | null | undefined;
}

export type CredentialsType = {
    username: string | null | undefined;
    password: string;
}