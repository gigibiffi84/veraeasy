import {createContext, useCallback, useContext, useEffect, useMemo} from "react";
import {useNavigate} from "react-router";
import {useLocalstorageState} from "rooks";
import useLoginAction from "@/lib/hooks/useLoginAction.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/features/Store.ts";
import {SignInState} from "@/features/signin/UserSignInState.tsx";
import {CredentialsType} from "@/api/SigninTypes.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const AuthContext = createContext();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const AuthProvider = ({children}) => {

    const [user, setUser] = useLocalstorageState<string | null | undefined>("veraeasy:user", "");
    const [token, setToken] = useLocalstorageState<string | null | undefined>("veraeasy:token", "");

    const navigate = useNavigate();

    const {loginAction} = useLoginAction();

    const tokenReceived$ = useSelector<RootState>((state) => state.rootReducer.signinState.currentToken);
    const signinState = useSelector<RootState>((state) => state.rootReducer.signinState) as SignInState;


    const login = useCallback(async (data: CredentialsType) => {
        loginAction(data);
    }, [navigate, setUser]);

    useEffect(() => {
        if (tokenReceived$) {
            setUser(signinState.currentUser);
            setToken(signinState.currentToken);
            navigate("/home");
        }
    }, [tokenReceived$, signinState]);


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