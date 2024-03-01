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

export function getValueFromLocalStorage(key: string) {
    if (typeof localStorage === "undefined") {
        return null;
    }

    const storedValue = localStorage.getItem(key) ?? "null";
    try {
        return JSON.parse(storedValue);
    } catch (error) {
        console.error(error);
    }

    return storedValue;
}

export function decodeUserByJwtToken(token: string): string {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub as string;

}
