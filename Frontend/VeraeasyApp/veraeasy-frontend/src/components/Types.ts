export type SummaryCardPropsType = {
    summary: SummaryCardType
    className: string
}

export type SummaryCardType = {
    businessId?: string, //title
    description?: string, //desc
    statusList?: SummaryStatusItem[] //string array of statuses
}

export type SummaryStatusItem = {
    statusCode?: "CREATED" | "PENDING" | "COMPLETED" | undefined;
    statusDescription?: string
}