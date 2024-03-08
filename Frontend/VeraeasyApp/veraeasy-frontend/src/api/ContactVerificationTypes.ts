export type ContactVerificationType = {
    "id"?: string | null,
    "email"?: string,
    "mobileNumber"?: string,
    "businessId"?: string,
    "personId"?: string,
    "personIdStrategy"?: "EN_SSN" | "IT_SSN"
    "status"?: typeof ContactVerificationStatusTypeRef.value
}

export type ContactVerificationAddressType = {
    "id": string | null,
    "email": string
}

export type OtpEmailVerificationType = {
    "emailAddress"?: string,
    "authToken"?: string,
    "error"?: string,
}

export type CreateContactVerificationType = {
    "id"?: string,
    "email"?: string,
    "mobileNumber"?: string,
    "businessKey"?: string,
    "personId"?: string
}

export type  ContactVerificationStatusType = {
    value: "CREATED" | "PENDING" | "COMPLETED" | undefined;
}

export const ContactVerificationStatusTypeRef = {
    value: "CREATED"
} as ContactVerificationStatusType;