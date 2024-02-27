import {Outlet} from 'react-router-dom';
import {Icons} from "@/components/icons.tsx";
import {useRef, useState} from "react";
import HeroComponent from "@/components/HeroComponent.tsx";
import {Hand} from "lucide-react";

export default function Root() {

    const [scrollDown, setScrollDown] = useState(false);
    
    const handleClick = (event) => {
        event.preventDefault();
        console.log('handle click');
        setScrollDown(true);
    }

    return <div className="p-0">


        <div className="mt-5 overflow-hidden">
            <Outlet context={[scrollDown, setScrollDown]}/>
        </div>
    </div>
}