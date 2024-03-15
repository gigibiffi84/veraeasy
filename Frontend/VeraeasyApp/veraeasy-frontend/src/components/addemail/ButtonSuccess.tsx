import {Button} from "@/components/ui/button"
import {ShieldCheck} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function ButtonSuccess({children}) {
    return (
        <Button disabled>
            <ShieldCheck/>
            {children}
        </Button>
    )
}
