import ContactVerificationApi from "@/api/ContactVerificationApi.ts";

const ContactVerificationService = {
    get: ContactVerificationApi.contactList$,
    create: ContactVerificationApi.contactCreated$
}

export default ContactVerificationService;