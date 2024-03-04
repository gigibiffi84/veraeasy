import {RotateCcw} from 'lucide-react';
import {Button} from "@/components/ui/button"

export function ButtonLoading() {
    return (
        <Button disabled>
            <RotateCcw className="mr-2 h-4 w-4 animate-spin"/>
            Please wait
        </Button>
    )
}
