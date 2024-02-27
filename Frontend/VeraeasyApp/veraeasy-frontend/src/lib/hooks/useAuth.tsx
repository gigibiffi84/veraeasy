import {createContext, useCallback, useContext, useMemo} from "react";
import {useNavigate} from "react-router";
import {useLocalstorageState} from "rooks";
import {CredentialsType, LoginContext} from "@/types/Types.ts";
import useLoginAction from "@/lib/hooks/useLoginAction.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const AuthContext = createContext<LoginContext>();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const AuthProvider = ({children}) => {

    const [user, setUser] = useLocalstorageState<string | null | undefined>("veraeasy:user", "");

    const navigate = useNavigate();

    const {loginAction} = useLoginAction();

    const login = useCallback(async (data: CredentialsType) => {
        /*const res = await LoginApi.userLogin(data);
        if (res.accessToken) {
            setUser(data.username);
            navigate("/home");
        }*/
        loginAction(data);
    }, [navigate, setUser]);


    const logout = useCallback(() => {
        setUser(null);
        navigate("/", {replace: true});
    }, [navigate, setUser]);

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};

export const useAuth = () => {
    return useContext(AuthContext);
};