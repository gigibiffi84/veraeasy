import {cn, mapClassStatus} from "@/lib/utils"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"

import {SummaryCardPropsType,} from "@/components/Types.ts";
import {AddEmailVerificationComponent} from "@/components/addemail/AddEmailVerificationComponent.tsx";

export default function SummaryCard({className, ...props}: SummaryCardPropsType) {
    return (
        <Card className={cn("w-auto", className)} {...props}>
            <CardHeader>
                <CardTitle>{props.summary.businessId}</CardTitle>
                <CardDescription>{props.summary.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span
                            className={cn("flex", "h-2", "w-2", "translate-y-1", "rounded-full", mapClassStatus(props.summary.currentStatus?.statusCode))}/>
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {props.summary.currentStatus?.statusCode}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {props.summary.currentStatus?.statusDescription}

                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>

                <AddEmailVerificationComponent contactId={props.summary.id}></AddEmailVerificationComponent>
            </CardFooter>
        </Card>
    )
}