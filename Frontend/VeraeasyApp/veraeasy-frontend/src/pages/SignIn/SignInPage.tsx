import HeroComponent from "@/components/signin/HeroComponent";
import {useAuth} from "@/lib/hooks/useAuth";
import {useEffect, useRef} from "react";
import SignIngLogo from "@/components/signin/SignInLogo.tsx";
import GSignComponent from "@/components/signin/GSignComponent.tsx";
import SignInForm from "@/pages/SignIn/SignInForm.tsx";
import {useOutletContext} from "react-router";
import {useAppToast} from "@/lib/hooks/useToasts.tsx";


export default function SignInPage() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [scrollDown, setScrollDown] = useOutletContext();
    const {login} = useAuth();
    useAppToast();

    const divRef = useRef(null);

    useEffect(() => {
        console.log('scroll down context is', scrollDown);
        if (scrollDown && divRef && divRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            divRef?.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
        setScrollDown(false);
    }, [scrollDown]);

    const handeLogin = async (e: { username: string, password: string }) => {

        await login(e);
    }
    return (
        <>
            <HeroComponent onScrollDown={() => setScrollDown(true)}></HeroComponent>

            <div
                id="scrollInto-1"
                ref={divRef}
                className="flex mx-auto">
                <div className="login-bg-image hidden bg-cover lg:block lg:w-1/2"
                ></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <SignIngLogo>Welcome</SignIngLogo>
                    <GSignComponent/>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a href="#"
                           className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or
                            login
                            with email</a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <SignInForm onSubmit={handeLogin}></SignInForm>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <a href="#" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or
                            sign up</a>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </>
    )
}