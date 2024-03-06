/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_LOGIN_URL: string;
    readonly VITE_LOGIN_REFRESH_URL: string;
    readonly VITE_REGISTER_USER_URL: string;
    readonly VITE_CONTACTS_LIST_URL: string;
    readonly VITE_CONTACTS_CREATE_URL: string;
    readonly VITE_GET_CONTACT_ADDRESS_URL: string;
    readonly VITE_OTP_LOGIN_URL: string;
    readonly VITE_OTP_GET_EMAIL_VERIFICATION: string;


    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}