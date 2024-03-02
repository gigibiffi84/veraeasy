import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "../ui/button";
import CreateContactForm from "@/components/create/CreateContactForm.tsx";
import {Toggle} from "../ui/toggle";
import {Icons} from "../icons";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {useCallback} from "react";

export default function CreateContactComponent({onCreateContact, open, onOpenChange}) {

    const handleCreate = useCallback((contact: {
        businessId: string,
        personId: string,
        email: string,
        mobileNumber: string
    }) => {
        onCreateContact(contact);
    }, [onCreateContact]);


    return (<Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Toggle className="ml-2 rounded-full h-10 px-2 border-blue-400"
                                    variant="outline"
                                    aria-label="Toggle new contact">
                                <Icons.add className="h-4"/>
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add new contact</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </SheetTrigger>
            <SheetContent onInteractOutside={event => event.preventDefault()}>
                <SheetHeader>
                    <SheetTitle>Create contact</SheetTitle>
                    <SheetDescription>
                        Create a new contact. All fields are required.
                    </SheetDescription>
                </SheetHeader>
                <CreateContactForm onCreateContact={handleCreate}>
                    <SheetFooter>
                        <Button type="submit">Create contact</Button>
                        <SheetClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
                </CreateContactForm>


            </SheetContent>
        </Sheet>
    );
}