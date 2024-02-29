import {useDispatch} from 'react-redux';
import {requestLoginAction} from "@/features/signin/UserSignInState.tsx";
import {CredentialsType} from "@/api/SigninTypes.ts";

const useLoginAction = () => {
    const dispatch = useDispatch();
    const loginAction = (credentials: CredentialsType) => dispatch(requestLoginAction(credentials));

    return {
        loginAction
    }
};
export default useLoginAction;