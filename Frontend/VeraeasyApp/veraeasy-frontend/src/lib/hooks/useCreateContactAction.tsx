import {useDispatch} from 'react-redux';
import {createNewContactAction} from "@/features/createcontact/CreateContactState.tsx";
import {CreateContactVerificationType} from "@/api/ContactVerificationTypes.ts";

const useCreateContactAction = () => {
    const dispatch = useDispatch();
    const createNewContactCommand = (newContact: CreateContactVerificationType) => dispatch(createNewContactAction(newContact));

    return {
        createNewContactCommand
    }
};
export default useCreateContactAction;