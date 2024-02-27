import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import LoginFormInput from "@/components/LoginFormInput.tsx";
import React from "react";
import {Icons} from "@/components/icons.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/features/Store.ts";


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z
        .string()
        .max(20, {message: "Password is invalid"}),
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function LoginForm({onSubmit}) {

    const isLoading$ = useSelector<RootState>((state) => state.rootReducer.signinState.loading)


    const form: UseFormReturn<{ username: string, password: string }> = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    function handleLogin(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        console.log('user login', values);
        onSubmit(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
                <LoginFormInput form={form} name="username" label="Username"
                                disabled={isLoading}
                                type="text">
                    {<a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
                        Forget
                        Username?</a>}
                </LoginFormInput>
                <LoginFormInput form={form} name="password" label="Password" disabled={isLoading$ as boolean}
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