/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_LOGIN_URL: string;
    readonly VITE_LOGIN_REFRESH_URL: string;
    readonly VITE_REGISTER_USER_URL: string;
    readonly VITE_CONTACTS_LIST_URL: string;
    readonly VITE_CONTACTS_CREATE_URL: string;
    readonly VITE_GET_CONTACT_ADDRESS_URL: string;


    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}