import {Outlet} from 'react-router-dom';
import {Icons} from "@/components/icons.tsx";
import {useRef, useState} from "react";

export default function Root() {

    const [scrollDown, setScrollDown] = useState(false);
    
    const handleClick = (event) => {
        event.preventDefault();
        console.log('handle click');
        setScrollDown(true);
    }

    return <div className="p-0">
        <header
            className="grid grid-cols-1 items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img"
        >
            <div
                className="text-end align-middle min-h-80 text-center text-2xl text-white bg-slate-800 bg-opacity-60 rounded-xl">
                <div className="inline-table mt-[12rem] mr-10">
                    <p className="text-sky-300 align-middle text-2xl">Welcome to Veraease</p>
                    <p className="text-slate-400 align-middle text-2xl">Where to Stay Secure and Authenticate with
                        Ease!</p>

                    <p className="justify-center text-sky-300 align-middle text-2xl">
                        <a href="#" onClick={handleClick}><Icons.down size={64} className="text-centerjustify-center mr-2 w-10 animate-ping"></Icons.down></a>
                    </p>
                </div>
            </div>


        </header>


        <div className="mt-5 overflow-hidden">
            <Outlet context={[scrollDown, setScrollDown]}/>
        </div>
    </div>
}