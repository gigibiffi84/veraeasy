import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ContactFormFieldProps} from "@/types/Types";
import React from "react";

export default function ContactFormInput({
                                             form,
                                             name,
                                             type,
                                             label,
                                             editable
                                         }: ContactFormFieldProps): React.JSX.Element {
    return (

        <div className="mt-0">
            <FormField
                control={form.control}
                name={name as never}
                render={({field}) => {
                    return (
                        <FormItem className="mt-0">
                            <div className="grid grid-cols-4 items-center gap-4">

                                <FormLabel className="text-right items-center">{label}</FormLabel>


                                <FormControl className="flex items-center justify-between">
                                    <Input className="col-span-3" type={type || "text"}
                                           placeholder={label} {...field} disabled={!editable}/>
                                </FormControl>
                            </div>
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