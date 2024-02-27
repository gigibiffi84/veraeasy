import { FieldError, UseFormReturn } from "react-hook-form";

export type FormFieldProps = {
    type: string;
    label: string;
    name: ValidFieldNames;
    form: UseFormReturn<any>;
};


export type ValidFieldNames =
    | "username"
    | "password"
