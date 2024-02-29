import {createContext, useContext, useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/features/Store.ts";
import {useToast} from "@/components/ui/use-toast.ts";


const AppToastContext = createContext(null);

export const AppToastProvider = ({children}) => {

    const errorReceived = useSelector<RootState>((state) => state.rootReducer.signinState.error) as string;
    const {toast} = useToast()


    useEffect(() => {
        console.log('error received>>>', errorReceived)
        if (errorReceived && errorReceived.length > 0)
            toast({
                title: "Error",
                description: errorReceived
            })
    }, [errorReceived, toast]);

    const value = useMemo(
        () => ({
            toast
        }),
        [toast]
    );

    return <AppToastContext.Provider value={value}>{children}</AppToastContext.Provider>;

}
export const useAppToast = () => {
    return useContext(AppToastContext);
};