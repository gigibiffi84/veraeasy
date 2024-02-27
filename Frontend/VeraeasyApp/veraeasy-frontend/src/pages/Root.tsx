import {Outlet} from 'react-router-dom';
import {useState} from "react";
import {AuthProvider} from "@/lib/hooks/useAuth.tsx";

export default function Root() {

    const [scrollDown, setScrollDown] = useState(false);

    return <div className="p-0">
        <div className="mt-5 overflow-hidden">
            <AuthProvider>
                <Outlet context={[scrollDown, setScrollDown]}/>
            </AuthProvider>
        </div>
    </div>
}