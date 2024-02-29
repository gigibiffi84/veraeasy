import {Check} from "lucide-react"

import {cn, mapClassStatus} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"

import {SummaryCardPropsType,} from "@/components/Types.ts";

export default function SummaryCard({className, ...props}: SummaryCardPropsType) {
    return (
        <Card className={cn("w-auto", className)} {...props}>
            <CardHeader>
                <CardTitle>{props.summary.businessId}</CardTitle>
                <CardDescription>{props.summary.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div>
                    {props.summary.statusList ? props.summary.statusList.map((item, index) => (
                            <div
                                key={index}
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                                <span
                                    className={cn("flex", "h-2", "w-2", "translate-y-1", "rounded-full", mapClassStatus(item.statusCode))}/>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {item.statusCode}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.statusDescription}
                                    </p>
                                </div>
                            </div>
                        )
                    ) : (<div>Show default when status list is empty!</div>)
                    }
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" className="w-full">
                    <Check className="mr-2 h-4 w-4"/> Verifica stato
                </Button>
            </CardFooter>
        </Card>
    )
}