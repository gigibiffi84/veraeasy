export type ContactVerificationType = {
    "id"?: string,
    "email"?: string,
    "mobileNumber"?: string,
    "businessKey"?: string,
    "personId"?: string,
    "personIdStrategy"?: "EN_SSN" | "IT_SSN"
    "currentStatus"?: typeof ContactVerificationStatusTypeRef.value
}

export type  ContactVerificationStatusType = {
    value: "CREATED" | "PENDING" | "COMPLETED" | undefined;
}

export const ContactVerificationStatusTypeRef = {
    value: "CREATED"
} as ContactVerificationStatusType;