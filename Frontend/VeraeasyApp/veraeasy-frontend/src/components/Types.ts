export type SummaryCardPropsType = {
    summary: SummaryCardType
    className: string
}

export type SummaryCardType = {
    businessId?: string, //title
    id: string, //guid
    description?: string, //desc
    currentStatus?: SummaryStatusItem //string array of statuses
}

export type SummaryStatusItem = {
    statusCode?: "CREATED" | "PENDING" | "COMPLETED" | undefined;
    statusDescription?: string
}