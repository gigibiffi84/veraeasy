import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {ContactVerificationStatusTypeRef} from "@/api/ContactVerificationTypes.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function mapClassStatus(status: (typeof ContactVerificationStatusTypeRef.value)): string {
    const classMap = {
        "bg-sky-500": status === "CREATED",
        "bg-amber-500": status === "PENDING",
        "bg-lime-500": status === "COMPLETED",
    }
    return clsx(classMap);
}

export function mapContactVerificationStatus(status: (typeof ContactVerificationStatusTypeRef.value)) {
    switch (status) {
        case "CREATED":
            return "Status is created, you need start email/mobile check"
        case "PENDING":
            return "Status is pending, check what's wrong";
        case "COMPLETED":
            return "Awesome! Your verification is complete, check it out!";
        default:
            return "";

    }
}

export function getToken(key: string): object | string | null {
    if (typeof sessionStorage === "undefined") {
        console.log("axios-interceptor utils getToken return null", key);
        return null;
    }

    const storedValue = sessionStorage.getItem(key) ?? "null";

    try {
        const parsed = JSON.parse(storedValue);
        console.log("axios-interceptor utils getToken", key, parsed);
        return parsed;
    } catch (error) {
        console.error(error);
    }
    console.log("axios-interceptor utils getToken", key, storedValue);
    return storedValue;
}

export function saveToken(key: string, token: object): void | null {
    if (typeof sessionStorage === "undefined") {
        console.log("axios-interceptor utils sessionStorage undefined", key);

        return null;
    }

    if (token === undefined) {
        console.log("axios-interceptor utils removeItem", key);
        return sessionStorage.removeItem(key);
    }

    console.log("axios-interceptor utils saveToken", key, JSON.stringify(token));
    sessionStorage.setItem(key, JSON.stringify(token));
}

export function decodeUserByJwtToken(token: string): string {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded["preferred_username"] as string;

}
