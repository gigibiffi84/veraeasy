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

export default function CreateContactComponent() {
    return (<Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Create</Button>
            </SheetTrigger>
            <SheetContent onInteractOutside={event => event.preventDefault()}>
                <SheetHeader>
                    <SheetTitle>Create contact</SheetTitle>
                    <SheetDescription>
                        Create a new contact. All fields are required.
                    </SheetDescription>
                </SheetHeader>
                <CreateContactForm>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Create contact</Button>
                        </SheetClose>
                    </SheetFooter>
                </CreateContactForm>


            </SheetContent>
        </Sheet>
    );
}