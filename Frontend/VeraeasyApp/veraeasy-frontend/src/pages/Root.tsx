import {Outlet} from 'react-router-dom';
import {useEffect, useState} from "react";
import {AuthProvider} from "@/lib/hooks/useAuth.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {AppToastProvider} from "@/lib/hooks/useToasts.tsx";
import {useNavigate} from "react-router";


export default function Root() {

    const [scrollDown, setScrollDown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const otp = window.location.pathname.includes("otp");
        console.log('location is otp?', otp);
        if (!otp) {
            navigate("login");
        }
    }, [navigate]);

    return <div className="p-0">
        <div className="bg-gray-100 mt-1 overflow-hidden">
            <Toaster></Toaster>
            <AppToastProvider>
                <AuthProvider>
                    <Outlet context={[scrollDown, setScrollDown]}/>
                </AuthProvider>
            </AppToastProvider>

        </div>
    </div>
}