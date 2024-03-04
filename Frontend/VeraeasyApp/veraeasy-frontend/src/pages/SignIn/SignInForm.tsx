import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SignInFormInput from "@/components/signin/SignInFormInput.tsx";
import React, {useEffect} from "react";
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
export default function SignInForm({onSubmit}) {

    const isLoading$ = useSelector<RootState>((state) => state.rootReducer.signinState.loading);
    const tokenPending$ = useSelector<RootState>((state) => state.rootReducer.signinState.currentUser);
    const tokenReceived$ = useSelector<RootState>((state) => state.rootReducer.signinState.currentToken);
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)


    useEffect(() => {
        console.log('isLoading changed', tokenPending$, isLoading$, !tokenReceived$);
        const loading: boolean = (tokenPending$ || isLoading$ && !tokenReceived$) as boolean;
        console.log('isLoading changed', loading);
        setIsLoading(loading);
        setIsLoggedIn((tokenReceived$ && tokenReceived$.toString().length > 0) as boolean)
    }, [isLoading$, tokenPending$, tokenReceived$]);

    const form: UseFormReturn<{ username: string, password: string }> = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });


    function handleLogin(values: z.infer<typeof formSchema>) {
        console.log('user login', values);
        onSubmit(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
                <SignInFormInput form={form} name="username" label="Username"
                                 editable={!isLoading || isLoggedIn}
                                 type="text">
                    <div></div>
                </SignInFormInput>
                <SignInFormInput form={form} name="password" label="Password" editable={!isLoading || isLoggedIn}
                                 type="password">
                    {<a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget
                        Password?</a>}
                </SignInFormInput>
                <div className="mt-6">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                        variant="default">
                        {isLoading && !isLoggedIn && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        {isLoggedIn && (
                            <Icons.loginSuccess className="mr-2 h-4 w-4 animate-ping"/>
                        )}
                        {!isLoading && !isLoggedIn ? "Sign In" : ""}
                        {isLoggedIn ? "Welcome back" : ""}
                        {isLoading && !isLoggedIn ? "Please wait..." : ""}
                        <Icons.login/>
                    </Button>
                </div>
            </form>
        </Form>
    )
}