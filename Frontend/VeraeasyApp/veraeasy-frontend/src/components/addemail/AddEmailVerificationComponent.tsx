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
import {ButtonLoading} from "@/components/addemail/ButtonLoading.tsx";

export function AddEmailVerificationComponent({open, onOpenChange, loading, contactId}: {
    open: boolean,
    loading: boolean,
    contactId: string,
    onOpenChange: (open: boolean) => void
}) {

    /*    const [status, onFetchData] = useObservableState(
            event$ => event$.pipe(
                switchMap(event =>
                    from(fetchData(event.currentTarget.id)).pipe(
                        map(value => <SuccessUI value={value} />),
                        // handle errors on sub-stream so that main stream stays alive
                        catchError(error => of(<FailedUI error={error} />)),
                        // show loading state immediately
                        startWith(<LoadingUI />)
                    )
                )
            ),
            () =>  <DefaultUI /> // initial state
        )*/


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                            defaultValue={contactId}
                            readOnly
                        />
                    </div>
                    {loading ? <ButtonLoading></ButtonLoading> :
                        <Button type="submit" size="sm" className="px-3">
                            <span className="sr-only">Send</span>
                            <Send className="h-4 w-4"/>
                        </Button>
                    }
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
