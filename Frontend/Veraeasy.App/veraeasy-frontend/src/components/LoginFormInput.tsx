import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import React from "react";
import {FormFieldProps} from "@/form-types/Types.ts";

export default function LoginFormInput({children, form, name, type, label}: FormFieldProps) : React.JSX.Element{
    return (
        <div className="mt-4">
            <FormField
                control={form.control}
                name={name}
                render={({field}) => {
                    return (
                    <FormItem className="mt-4">
                        <div className="flex justify-between">

                            <FormLabel>{label}</FormLabel>
                            {children || <p></p>}                            
                        </div>
                        <FormControl className="flex items-center justify-between mt-4">
                            <Input type={type || "text"} placeholder={label} {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}}
            />
        </div>

    )
}