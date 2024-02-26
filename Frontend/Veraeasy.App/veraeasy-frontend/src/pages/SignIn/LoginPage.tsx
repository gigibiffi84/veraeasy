import LoginForm from "@/pages/SignIn/LoginForm.tsx";
import SignIngLogo from "@/components/SignInLogo.tsx";
import GSignComponent from "@/components/GSignComponent.tsx";
import LoginFormInput from "@/components/LoginFormInput.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function LoginPage() {
    return(
        <>
            <div
                className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2"
                     style={{backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')" }}></div>

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