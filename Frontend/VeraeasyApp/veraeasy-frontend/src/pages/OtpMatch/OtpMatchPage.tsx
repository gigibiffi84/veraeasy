import React, {useEffect, useState} from "react";
import {useDidMount} from "rooks";
import {useParams} from "react-router";
import {useObservable, useSubscription} from "observable-hooks";
import {distinctUntilChanged, switchMap} from "rxjs/operators";
import otpMatchApi from "@/api/OtpMatchApi.ts";
import {OtpEmailVerificationType} from "@/api/ContactVerificationTypes.ts";
import {OtpInput} from "reactjs-otp-input";
import "./OtpMatchPage.scss";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ShieldCheck} from "lucide-react";

const OtpMatchPage = () => {

    const [userOtp, setUserOtp] = useState<string>("");
    const [otpSession, setOtpSession] = useState<OtpEmailVerificationType>({});

    const {uuid} = useParams<string>();

    useEffect(() => {
        console.log("otp-match use effect init", uuid);
    }, [uuid]);

    useDidMount(() => {
        console.log("otp-match use did mount", uuid)
    });

    const onInitComplete = (result: OtpEmailVerificationType) => {
        console.log('otp-match init completed', result);
        setOtpSession(result);
    }

    const init$ = useObservable((event$) => {
        return event$.pipe(
            distinctUntilChanged((a, b) => a[0] === b[0]),
            switchMap(([uuid]) =>
                otpMatchApi.otpLogin$({username: "veraeasy", password: "12345678"})
                    .pipe(
                        switchMap(token => otpMatchApi.emailVerificationByUuid$(uuid as string, token.access_token as string))
                    )
            )
        )
    }, [uuid]);

    useSubscription(init$, onInitComplete);


    const handleOtpChange = (e: string) => {
        console.log('handle otp change', e);
        setUserOtp(e);
    }


    return (
        <div className="bg-gray-100	min-h-screen flex flex-col m-0 p-0  border-0 ">
            <div className=" md:container md:mx-auto justify-center border-0 ">

                <header className='shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] relative'>
                    <div className='flex flex-wrap items-center justify-between gap-5'>
                        <a href="javascript:void(0)"
                           className="lg:absolute max-lg:top-4 max-lg:left-10 max-sm:left-4 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"><img
                            src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36'/>
                        </a>

                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>Otp verify for {otpSession.emailAddress}</p>
                        <div className='flex items-center ml-auto lg:order-1'>

                            <button className='mr-6 font-semibold text-[15px] border-none outline-none'><a
                                href='javascript:void(0)'
                                className='text-[#007bff] hover:underline'>Need Help?</a></button>

                            <button id="toggle" className='lg:hidden ml-7'>
                                <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>

                    </div>
                </header>

                <div className="otp-container">
                    <h3>Insert the One Time Password received on your email address to verify your contact</h3>
                </div>
                <OtpInput
                    value={userOtp}
                    onChange={handleOtpChange}
                    numInputs={6}
                    inputStyle={"otp-input"}
                    containerStyle={"otp-container"}
                    isInputSecure={false}
                    separator={<span>_</span>}
                    isInputNum={true}/>
                <div className="otp-container">
                    <Button variant={"default"}><ShieldCheck/> Verify</Button>
                </div>

            </div>
        </div>
    )
}

export default OtpMatchPage;