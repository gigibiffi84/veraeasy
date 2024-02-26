import LoginForm from "@/pages/SignIn/LoginForm.tsx";
import SignIngLogo from "@/components/SignInLogo.tsx";
import GSignComponent from "@/components/GSignComponent.tsx";
import LoginFormInput from "@/components/LoginFormInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useOutletContext} from "react-router";
import {LegacyRef, useEffect, useRef} from "react";
import {useRefElement} from "rooks";

export default function LoginPage() {
    const [scrollDown, setScrollDown] = useOutletContext();
    const divRef = useRef(null);
    useEffect(()=>{
        console.log('scroll down context is', scrollDown);
        if(scrollDown && divRef){
            divRef?.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setScrollDown(false);
    }, [scrollDown])
    return(
        <>
            <div
                id="scrollInto-1"
                ref={divRef}
                className="flex mx-auto">
                <div className="login-bg-image hidden bg-cover lg:block lg:w-1/2"
                    ></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <SignIngLogo>Welcome</SignIngLogo>
                    <GSignComponent />

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a href="#"
                           className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or
                            login
                            with email</a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                   <LoginForm></LoginForm>
                    
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