import LoginForm from "@/pages/SignIn/LoginForm.tsx";
import SignIngLogo from "@/components/SignInLogo.tsx";
import GSignComponent from "@/components/GSignComponent.tsx";
import {useOutletContext} from "react-router";
import {useEffect, useRef} from "react";
import HeroComponent from "@/components/HeroComponent.tsx";
import {useAuth} from "@/lib/hooks/useAuth.tsx";

export default function LoginPage() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [scrollDown, setScrollDown] = useOutletContext();
    const {login} = useAuth();

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

                    <LoginForm onSubmit={handeLogin}></LoginForm>

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