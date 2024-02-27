import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FormFieldProps} from "@/types/Types";
import React from "react";

export default function SignInFormInput({children, form, name, type, label}: FormFieldProps): React.JSX.Element {
    return (
        <div className="mt-4">
            <FormField
                control={form.control}
                name={name as "username" | "password"}
                render={({field}) => {
                    return (
                        <FormItem className="mt-4">
                            <div className="flex justify-between">

                                <FormLabel>{label}</FormLabel>
                                {children || <p></p>}
                            </div>
                            <FormControl className="flex items-center justify-between mt-4">
                                <Input className="form-input px-4 py-3 rounded-full" type={type || "text"}
                                       placeholder={label} {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )
                }}
            />
        </div>

    )
}