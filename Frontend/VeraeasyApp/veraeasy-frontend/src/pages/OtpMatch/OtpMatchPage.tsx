import {JSX, useEffect, useState} from "react";
import {useDidMount} from "rooks";
import {useParams} from "react-router";
import {useObservable, useObservableState, useSubscription} from "observable-hooks";
import {catchError, switchMap, tap} from "rxjs/operators";
import otpMatchApi from "@/api/OtpMatchApi.ts";
import {OtpEmailVerificationType} from "@/api/ContactVerificationTypes.ts";
import {OtpInput} from "reactjs-otp-input";
import "./OtpMatchPage.scss";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RefreshCcw, ShieldCheck} from "lucide-react";
import useQueryParam from "@/lib/hooks/useQueryParam.tsx";
import {of, timer} from "rxjs";
import {ButtonSuccess} from "@/components/addemail/ButtonSuccess.tsx";

export type OtpVerifyRequest = {
    otp: string;
    token: string
}

export type OtpVerifyResponse = {
    success: boolean;
    error: string | undefined
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const OtpInputComponent = ({userOtp, handleOtpChange, otpVerified, onOtpVerify, otpAuthToken}) => (
    <>
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
            {otpVerified ?
                <ButtonSuccess>Otp Verified</ButtonSuccess>
                :
                <Button onClick={() => onOtpVerify({
                    otp: userOtp,
                    token: otpAuthToken
                })} variant={"default"}><ShieldCheck/> Verify</Button>
            }


        </div>
    </>
);

const InvalidLinkComponent = () => (
    <>
        <div className="otp-container">
            <h3>Sorry this link is invalid or expired</h3>
        </div>
    </>
)

const InvalidOtpComponent = () => (
    <>
        <div className="otp-container">
            <h3>Sorry the otp you submit is invalid or expired</h3>
        </div>
        <div className="otp-container">
            <Button onClick={() => window.location.reload()} variant={"default"}><RefreshCcw/> Click here to
                retry</Button>
        </div>
    </>
)

const OtpMatchPage = () => {

    const [userOtp, setUserOtp] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [otpComponent, setOtpComponent] = useState<JSX.Element>(undefined);
    const [otpVerified, setOtpVerified] = useState<boolean>(false);
    const [otpAuthToken, setOtpAuthToken] = useState<string>("");
    const [otpSession, setOtpSession] = useState<OtpEmailVerificationType>({});

    const {uuid} = useParams<string>();
    const queryParam = useQueryParam()

    useEffect(() => {
        console.log("otp-match use effect init", uuid);
    }, [uuid]);

    useDidMount(() => {
        const authToken = queryParam.get("token");
        console.log("otp-match use did mount", uuid, authToken)
        setOtpAuthToken(authToken as string);

    });

    const onInitComplete = (result: OtpEmailVerificationType) => {
        console.log('otp-match init completed', result);

        if (result && result.error) {
            switch (result.error) {
                case "invalid_link":
                    setOtpComponent(<InvalidLinkComponent/>);
                    break;
                case "invalid_otp":
                    setOtpComponent(<InvalidOtpComponent/>)

                    break;
            }
        } else {
            setOtpSession(result);
        }
    }

    const init$ = useObservable((event$) => {
        return event$.pipe(
            //distinctUntilChanged((a, b) => a[0] === b[0]),
            //distinctUntilChanged((a, b) => a[1] === b[1]),            
            switchMap(([uuid, authToken]) =>
                timer(100)
                    .pipe(
                        switchMap(() => otpMatchApi.emailVerificationByUuid$(uuid as string, authToken as string)),
                        catchError(() => of({error: "invalid_link"}))
                    )
            )
        )
    }, [uuid, otpAuthToken]);

    useSubscription(init$, onInitComplete);


    const handleOtpChange = (e: string) => {
        console.log('otp-match handle otp change', e);
        setUserOtp(e);
    }

    const [verifyResult, onOtpVerify] = useObservableState<OtpVerifyResponse, OtpVerifyRequest>(otpEvent$ =>
            otpEvent$.pipe(
                tap((event) => console.log('otp-match', event)),
                switchMap((input) => otpMatchApi.otpVerified$(uuid as string, input.otp, input.token)
                    .pipe(
                        catchError(() => of({success: false, error: "invalid_otp"}))
                    )
                )
            ),
        {success: false, error: undefined}
    );

    useEffect(() => {
        console.log("otp-match verifyResult", verifyResult)
        setOtpVerified(verifyResult && verifyResult.success);
        if (verifyResult && verifyResult.error) {
            switch (verifyResult.error) {
                case "invalid_link":
                    setOtpComponent(<InvalidLinkComponent/>);
                    break;
                case "invalid_otp":
                    setOtpComponent(<InvalidOtpComponent/>)

                    break;
            }
        }
    }, [verifyResult]);


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
                {otpComponent ? otpComponent : <OtpInputComponent
                    userOtp={userOtp}
                    onOtpVerify={onOtpVerify}
                    otpVerified={otpVerified}
                    handleOtpChange={handleOtpChange} otpAuthToken={otpAuthToken}
                ></OtpInputComponent>}


            </div>
        </div>
    )
}

export default OtpMatchPage;