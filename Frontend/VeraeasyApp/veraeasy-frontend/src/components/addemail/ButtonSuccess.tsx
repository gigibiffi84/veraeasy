import {Button} from "@/components/ui/button"
import {ShieldCheck} from "lucide-react";

export function ButtonSuccess({children}) {
    return (
        <Button disabled>
            <ShieldCheck/>
            {children}
        </Button>
    )
}
