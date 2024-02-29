export type SummaryCardPropsType = {
    summary: SummaryCardType
    className: string
}

export type SummaryCardType = {
    businessId?: string, //title
    description?: string, //desc
    statusList?: string[] //string array of statuses
}