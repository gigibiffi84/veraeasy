import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import LoginFormInput from "@/components/LoginFormInput.tsx";
import React from "react";
import {Icons} from "@/components/icons.tsx";


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z
        .string()
        .max(20, {message: "Password is invalid"}),
})

export default function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: ""
        },
    });

    const [isLoading, setIsLoading] = React.useState<boolean>(false)


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <LoginFormInput error={undefined} form={form} name="username" label="Username" disabled={isLoading}
                                type="text">
                    {<a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
                        Forget
                        Username?</a>}
                </LoginFormInput>
                <LoginFormInput error={undefined} form={form} name="password" label="Password" disabled={isLoading}
                                type="password">
                    {<a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget
                        Password?</a>}
                </LoginFormInput>
                <div className="mt-6">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                        variant="default">
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Sign In
                        <Icons.login/>
                    </Button>
                </div>
            </form>
        </Form>
    )
}