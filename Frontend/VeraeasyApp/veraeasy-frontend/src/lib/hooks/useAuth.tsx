import {createContext, useCallback, useContext, useEffect, useMemo} from "react";
import {useNavigate} from "react-router";
import useLoginAction from "@/lib/hooks/useLoginAction.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/features/Store.ts";
import {SignInState} from "@/features/signin/UserSignInState.tsx";
import {CredentialsType} from "@/api/SigninTypes.ts";
import {useSessionStorageState} from "@/lib/hooks/useSessionStorageState.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const AuthContext = createContext<{
    user: string | null | undefined,
    token: string | null | undefined,
    login: (data: CredentialsType) => Promise<void>,
    logout: () => void
}>();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const AuthProvider = ({children}) => {

    const [user, setUser] = useSessionStorageState<string | null | undefined>("veraeasy:user", "");
    const [token, setToken] = useSessionStorageState<string | null | undefined>("veraeasy:token", "");

    const navigate = useNavigate();

    const {loginAction} = useLoginAction();

    const tokenReceived$ = useSelector<RootState>((state) => state.rootReducer.signinState.currentToken);
    const signinState = useSelector<RootState>((state) => state.rootReducer.signinState) as SignInState;
    const signinStateCompleted = useSelector<RootState>((state) => state.rootReducer.signinState.fetched) as SignInState;


    const login = useCallback(async (data: CredentialsType) => {
        loginAction(data);
    }, [navigate, setUser]);

    useEffect(() => {
        if (tokenReceived$ && signinStateCompleted) {
            console.log("tokenReceived$,", tokenReceived$)
            setUser(signinState.currentUser);
            setToken(signinState.currentToken as string);
            navigate("home");
        }
    }, [tokenReceived$, signinState, signinStateCompleted]);


    const logout = useCallback(() => {
        setUser(null);
        navigate("login", {replace: true});
    }, [navigate, setUser]);

    const value = useMemo(
        () => ({
            user,
            token,
            login,
            logout,
        }),
        [user, token, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};

export const useAuth = (): {
    user: string | null | undefined,
    token: string | null | undefined,
    login: (data: CredentialsType) => Promise<void>,
    logout: () => void
} => {
    return useContext(AuthContext);
};