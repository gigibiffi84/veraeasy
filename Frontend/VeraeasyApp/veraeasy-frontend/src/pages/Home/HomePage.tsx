import './HomePage.scss';
import React, {useEffect, useState} from "react";
import {SummaryCardPropsType, SummaryCardType} from "@/components/Types.ts";
import {ContactVerificationType, CreateContactVerificationType} from "@/api/ContactVerificationTypes.ts";
import {mapContactVerificationStatus, saveToken} from "@/lib/utils.ts";
import ContactVerificationApi from "@/api/ContactVerificationApi.ts";
import SkeletonCardList from '@/components/summarycard/SkeletonCardList';
import StatefulSearchInput from '@/components/typeahead/StatefulSearchInput';
import LoadingSpinner from "@/components/ui/spinner.tsx";
import SummaryCardList from "@/components/summarycard/SummaryCardList.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import CreateContactComponent from "@/components/create/CreateContactComponent.tsx";
import useCreateContactAction from "@/lib/hooks/useCreateContactAction.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/features/Store.ts";
import {CreateContactState} from "@/features/createcontact/CreateContactState.tsx";
import {useObservable, useSubscription} from "observable-hooks";
import {useAuth} from "@/lib/hooks/useAuth.tsx";
import {catchError, distinctUntilChanged, map, startWith, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {useNavigate} from "react-router";

const clearSession = () => {
    saveToken("veraeasy:token", undefined);
    saveToken("veraeasy:user", undefined);
    window.location.reload();
}
export const LoginButton = () => {
    return (<button
        className='px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Sign
        up
    </button>);
}

export const HeaderMenu = () => {
    return (<ul id="collapseMenu"
                className='lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full'>
        <li className='max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded'>
            <a href='javascript:void(0)'
               className='lg:hover:text-[#007bff] text-[#007bff] max-lg:text-white block font-semibold text-[15px]'>Home</a>
        </li>
        <li className='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'><a href='javascript:void(0)'
                                                                           className='lg:hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Team</a>
        </li>
        <li className='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'><a href='javascript:void(0)'
                                                                           className='lg:hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Feature</a>
        </li>
        <li className='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'><a href='javascript:void(0)'
                                                                           className='lg:hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Blog</a>
        </li>
    </ul>)
}
export default function HomePage() {

    const [text, updateText] = React.useState("");
    const [loading, setIsLoading] = React.useState(false);
    const [isDefault, setIsDefault] = React.useState(true);
    const [contacts, setContacts] = React.useState([] as SummaryCardPropsType[]);
    const {createNewContactCommand} = useCreateContactAction();
    const [open, setOpen] = useState(undefined);
    const createContactState = useSelector<RootState>((state) => state.rootReducer.createContact) as CreateContactState;
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('current user is', user);
    }, [user]);

    const initialList$ = useObservable(($user) => {
        return $user.pipe(
            distinctUntilChanged((a, b) => a[0] === b[0]),
            tap((val) => console.log(val)),
            switchMap(([open, _user]) => open === true ? [] : ContactVerificationApi.contactListByOwner$(_user)),
            map(contacts => contacts),
            catchError((err) => of({error: err})),
            startWith([]),
        )
    }, [open, user, text]);

    useEffect(() => {
        console.log("open state changed", open);
    }, [open]);

    useEffect(() => {
        if (createContactState.fetched || createContactState.error) {
            setOpen(false);
        }
    }, [createContactState]);

    const handleSearchComplete = (result: ContactVerificationType[] | { error: string; } | { state: string; }) => {
        console.log('handle search complete', result);
        const contacts = result as ContactVerificationType[];
        const stateResult = result as { state: string; }
        setIsDefault(false)
        if (stateResult.state && stateResult.state === "loading") {
            console.log("setIsloading true");
            setIsLoading(true);
            return;
        }

        if (stateResult.state && stateResult.state === "default") {
            console.log("setIsloading true");
            setIsLoading(false);
            if (contacts && contacts.length <= 0) {
                setIsDefault(true);
                setContacts([]);
                return;
            }
        }

        if (contacts.length) {
            const summaryCards = contacts.map(c => {
                return c.businessId ? {
                        summary: {
                            businessId: c.businessId,
                            description: c.personId,
                            id: c.id,
                            currentStatus: {
                                statusCode: c.status,
                                statusDescription: mapContactVerificationStatus(c.status)
                            }
                        } as SummaryCardType,
                        className: ""
                    } as SummaryCardPropsType
                    : {} as SummaryCardPropsType;
            })
            setIsLoading(false);
            setContacts(summaryCards);
        }
    }

    useSubscription(initialList$, handleSearchComplete);


    const handleCreateContact = (contact: CreateContactVerificationType) => {
        console.log('new contact created', contact);
        createNewContactCommand(contact);
    }

    return (

        <div className="bg-gray-100	min-h-screen flex flex-col m-0 p-0  border-0 ">

            <div className=" md:container md:mx-auto  justify-center border-0 ">
                <header className='shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] relative'>
                    <div className='flex flex-wrap items-center justify-between gap-5'>
                        <a href="javascript:void(0)"
                           className="lg:absolute max-lg:top-4 max-lg:left-10 max-sm:left-4 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"><img
                            src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36'/>
                        </a>

                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>Wellcome {user}</p>
                        <div className='flex items-center ml-auto lg:order-1'>


                            <button className='mr-6 font-semibold text-[15px] border-none outline-none'><a
                                href='javascript:void(0)'
                                onClick={() => clearSession()}
                                className='text-[#007bff] hover:underline'>Sign out</a></button>
                            <button className='mr-6 font-semibold text-[15px] border-none outline-none'><a
                                href='javascript:void(0)'
                                className='text-[#007bff] hover:underline'>Need Help?</a></button>

                            <button id="toggle" className='lg:hidden ml-7'>
                                <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>

                    </div>
                </header>
            </div>
            <div className="md:container md:mx-auto md:mt-5 flex justify-center border-0 ">

                <StatefulSearchInput fetcherFunction={ContactVerificationApi.contactList$}
                                     cancelFunction={ContactVerificationApi.emptyContactList$}
                                     inputText={text}
                                     onSearch={updateText}
                                     onSearchResultComplete={handleSearchComplete}
                ></StatefulSearchInput>
                <div>
                    <CreateContactComponent open={open} onOpenChange={setOpen}
                                            onCreateContact={handleCreateContact}></CreateContactComponent>
                </div>
            </div>
            <div className="md:container md:mx-auto md:mt-5 flex justify-center border-0 ">
                <div>Search result count is: {loading ? "..." : contacts.length}</div>
            </div>

            <div className="md:container md:mx-auto md:mt-1 flex justify-center border-0 ">
                {isDefault ? <SkeletonCardList></SkeletonCardList> : <div></div>}
                {!loading ? <SummaryCardList cards={contacts}></SummaryCardList> :
                    <LoadingSpinner size={64}></LoadingSpinner>}
            </div>
        </div>
    )
}