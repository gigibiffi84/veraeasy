import './HomePage.scss';
import React, {useEffect} from "react";
import {SummaryCardPropsType, SummaryCardType} from "@/components/Types.ts";
import {ContactVerificationType} from "@/api/ContactVerificationTypes.ts";
import {mapContactVerificationStatus} from "@/lib/utils.ts";
import ContactVerificationApi from "@/api/ContactVerificationApi.ts";
import SkeletonCardList from '@/components/summarycard/SkeletonCardList';
import StatefulSearchInput from '@/components/typeahead/StatefulSearchInput';
import LoadingSpinner from "@/components/ui/spinner.tsx";
import SummaryCardList from "@/components/summarycard/SummaryCardList.tsx";

export default function HomePage() {

    const [text, updateText] = React.useState("");
    const [loading, setIsLoading] = React.useState(false);
    const [isDefault, setIsDefault] = React.useState(true);
    const [contacts, setContacts] = React.useState([] as SummaryCardPropsType[]);


    useEffect(() => {

        setContacts([]);
    }, []);

    useEffect(() => {
        /* if ((!contacts || contacts.length <= 0)) {
             setIsDefault(true);
             setContacts([]);
         } else {
 
             setIsDefault(false);
         }*/
    }, [loading, isDefault, contacts]);

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
            setIsDefault(true);
            setContacts([]);
            return
        }

        if (contacts.length) {
            const summaryCards = contacts.map(c => {
                return c.id ? {
                        summary: {
                            businessId: c.businessKey,
                            description: c.personId,
                            statusList: [
                                {
                                    statusCode: c.currentStatus,
                                    statusDescription: mapContactVerificationStatus(c.currentStatus)
                                }
                            ]
                        } as SummaryCardType,
                        className: ""
                    } as SummaryCardPropsType
                    : {} as SummaryCardPropsType;
            })
            setIsLoading(false);
            setContacts(summaryCards);
        }
    }

    return (

        <div className="bg-gray-100	min-h-screen flex flex-col m-0 p-0  border-0 ">

            <div className="md:container md:mx-auto flex justify-center border-0 ">
                <div>Header</div>
            </div>
            <div className="md:container md:mx-auto md:mt-5 flex justify-center border-0 ">
                <StatefulSearchInput fetcherFunction={ContactVerificationApi.contactList$}
                                     cancelFunction={ContactVerificationApi.emptyContactList$}
                                     inputText={text}
                                     onSearch={updateText}
                                     onSearchResultComplete={handleSearchComplete}
                ></StatefulSearchInput>
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