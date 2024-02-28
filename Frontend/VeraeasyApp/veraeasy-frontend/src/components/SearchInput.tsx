import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Icons} from "@/components/icons.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "rooks";

export default function SearchInput() {

    const [searchKeys, setSearchKeys] = useState('');
    const setValueDebounced = useDebounce(setSearchKeys, 500);

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setValueDebounced(event.target.value);
    }

    useEffect(() => {

    }, []);

    return (
        <div className="flex flex-col w-full max-w-lg items-center ">
            <div className="flex w-full max-w-lg items-center gap-1.5">
                <Label htmlFor="email"> <Icons.search></Icons.search></Label>
                <Input onChange={handleSearchInputChange} type="text"
                       placeholder="Try search by email or mobile number..."/>

            </div>
            <div><p className="font-mono">Trying to search for: {searchKeys}</p></div>
        </div>
    )
}