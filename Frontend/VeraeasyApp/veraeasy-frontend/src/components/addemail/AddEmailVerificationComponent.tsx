import {Mail, Send} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useObservable, useSubscription} from "observable-hooks";
import {distinctUntilChanged, filter, switchMap} from "rxjs/operators";
import contactVerificationApi from "@/api/ContactVerificationApi.ts";
import {JSX, useEffect, useState} from "react";
import {timer} from "rxjs";
import {useDidMount} from "rooks";
import emailVerificationApi from "@/api/EmailVerificationApi.ts";
import {ButtonSuccess} from "@/components/addemail/ButtonSuccess.tsx";
import {ButtonLoading} from "@/components/addemail/ButtonLoading.tsx";

export function AddEmailVerificationComponent({open, onOpenChange, contactId}: {
    open: boolean,
    loading: boolean,
    contactId: string,
    onOpenChange: (open: boolean) => void
}) {

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [contactId$, setContactId$] = useState<string | undefined>(undefined);
    const [opened$, setOpened$] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [sending, setSending] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [currentButton, setCurrentButton] = useState<JSX.Element>(<div/>);

    const init$ = useObservable((event$) => {
        return event$.pipe(
            distinctUntilChanged((a, b) => a[0] === b[0]),
            switchMap(([uuid, opened]) =>
                timer(1000).pipe(
                    filter(() => opened !== undefined && opened),
                    filter(() => uuid.length > 0),
                    switchMap(() => contactVerificationApi.contactMailAddressById$(uuid))
                )
            )
        )
    }, [contactId$ as string, opened$]);

    const emailAdded$ = useObservable(event$ => {
        return event$.pipe(
            distinctUntilChanged((a, b) => a[0] === b[0]),
            switchMap(([sending, email]) =>
                timer(500).pipe(
                    filter(() => sending !== undefined && sending),
                    switchMap(() => emailVerificationApi.emailVerificationCreated$(email as string))
                ),
            )
        )
    }, [sending, email])

    function resetState() {
        setLoading(true);
        setEmail('');
        setSending(false);
        setSuccess(false);
        setOpened$(false);
    }

    useDidMount(() => {
        console.log('use did mount');
        resetState();
    })

    const onInitComplete = (result: string) => {
        setEmail(result);
        setLoading(false);
    }

    const onEmailAdded = (result: object) => {
        setSending(false);
        setLoading(false);
        setSuccess(true);
    }

    useSubscription(init$, onInitComplete);
    useSubscription(emailAdded$, onEmailAdded);

    useEffect(() => {
        if (opened$ && contactId.length > 0) {
            setContactId$(contactId);
        } else {
            setContactId$(undefined);
        }
    }, [opened$, contactId]);

    const handleOpenChange = (e: boolean) => {
        setOpened$(e);
        if (!e) {
            resetState();
        }
        onOpenChange && onOpenChange(e);
    }

    const handleSendOtp = () => {
        setSending(true);
        setLoading(true);

    }

    useEffect(() => {
        console.log(loading, success, sending)
        if (loading || sending) {
            setCurrentButton(<ButtonLoading></ButtonLoading>);
            return;
        }
        if (success) {
            setCurrentButton(<ButtonSuccess></ButtonSuccess>);
            return;
        } else {
            setCurrentButton(
                <Button onClick={handleSendOtp} type="submit" size="sm" className="px-3">
                    <span className="sr-only">Send</span>
                    <Send className="h-4 w-4"/>
                </Button>)
            return;
        }
    }, [loading, success, sending]);


    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4"/> Check email
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Send OTP</DialogTitle>
                    <DialogDescription>
                        Check if address is correct before send...
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={email}
                            readOnly
                        />
                    </div>
                    <>
                        {currentButton}
                    </>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
