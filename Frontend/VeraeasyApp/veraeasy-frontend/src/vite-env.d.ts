/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_LOGIN_URL: string
    readonly VITE_REGISTER_USER_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}