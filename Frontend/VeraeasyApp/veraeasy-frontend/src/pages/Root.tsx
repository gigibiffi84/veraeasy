import {Outlet} from 'react-router-dom';
import {useState} from "react";
import {AuthProvider} from "@/lib/hooks/useAuth.tsx";

export default function Root() {

    const [scrollDown, setScrollDown] = useState(false);

    return <div className="p-0">
        <div className="bg-gray-100 mt-1 overflow-hidden">
            <AuthProvider>
                <Outlet context={[scrollDown, setScrollDown]}/>
            </AuthProvider>
        </div>
    </div>
}