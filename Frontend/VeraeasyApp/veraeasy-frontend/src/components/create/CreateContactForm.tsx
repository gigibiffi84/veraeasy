import {Form} from "@/components/ui/form.tsx";

import {useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import ContactFormInput from "@/components/create/ContactFormInput.tsx";
import {useCallback} from "react";

const formSchema = z.object({
    dossierId: z.string().min(2),
    personId: z.string().min(16),
    email: z
        .string()
        .email(),
    mobileNumber: z.string().min(8)

})
export default function CreateContactForm({children, onCreateContact}) {
    const form: UseFormReturn<{
        dossierId: string,
        personId: string,
        email: string,
        mobileNumber: string
    }> = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dossierId: "",
            personId: "",
            email: "",
            mobileNumber: ""

        },
    });

    const handleCreate = useCallback((contact: {
        dossierId: string,
        personId: string,
        email: string,
        mobileNumber: string
    }) => {
        onCreateContact(contact);
    }, [onCreateContact]);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-8 mt-2">
                <div className="grid">
                    <ContactFormInput form={form} name="dossierId" label="DossierId"
                                      editable={true}
                                      type="text"/>

                    <ContactFormInput form={form} name="personId" label="Codice Persona" editable={true}
                                      type="text"/>
                    <ContactFormInput form={form} name="email" label="Email" editable={true}
                                      type="email"/>
                    <ContactFormInput form={form} name="mobileNumber" label="Numero cellualre" editable={true}
                                      type="phone"/>


                </div>
                {children}
            </form>
        </Form>
    )
}