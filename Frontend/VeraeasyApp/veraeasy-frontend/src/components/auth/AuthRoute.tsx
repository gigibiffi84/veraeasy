import {Navigate} from "react-router-dom";
import {useAuth} from "@/lib/hooks/useAuth.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const AuthRoute = ({children}) => {
    const {user} = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="login"/>;
    }
    return children;
};