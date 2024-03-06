import {Button} from "@/components/ui/button"
import {ShieldCheck} from "lucide-react";

export function ButtonSuccess() {
    return (
        <Button disabled>
            <ShieldCheck/>
            Email sent
        </Button>
    )
}
