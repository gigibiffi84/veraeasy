import './HomePage.scss';
import React, {useEffect} from "react";
import StatefulSearchInput from "@/components/typeahead/StatefulSearchInput.tsx";
import ContactVerificationApi from "@/api/ContactVerificationApi.ts";
import {ContactVerificationType} from "@/api/ContactVerificationTypes.ts";
import {SummaryCardPropsType, SummaryCardType} from "@/components/Types.ts";
import SummaryCardList from "@/components/summarycard/SummaryCardList.tsx";

export default function HomePage() {

    const [text, updateText] = React.useState("");
    const [contacts, setContacts] = React.useState([] as SummaryCardPropsType[]);


    useEffect(() => {

        setContacts([]);
    }, []);

    const handleSearchComplete = (result: ContactVerificationType[] | { error: string; } | { state: string; }) => {
        const contacts = result as ContactVerificationType[];
        if (contacts.length) {
            const summaryCards = contacts.map(c => {
                return c.id ? {
                        summary: {
                            businessId: c.businessKey,
                            description: c.personId,
                            statusList: ["Verification not started"]
                        } as SummaryCardType,
                        className: ""
                    } as SummaryCardPropsType
                    : {} as SummaryCardPropsType;
            })
            setContacts(summaryCards);
        }
    }

    return (

        <div className="bg-gray-100	min-h-screen flex flex-col m-0 p-0  border-2 border-sky-500">

            <div className="md:container md:mx-auto flex justify-center border-2 border-sky-500">
                <div>Header</div>
            </div>
            <div className="md:container md:mx-auto md:mt-5 flex justify-center border-2 border-sky-500">
                <StatefulSearchInput fetcherFunction={ContactVerificationApi.contactList$}
                                     cancelFunction={ContactVerificationApi.emptyContactList$}
                                     inputText={text}
                                     onSearch={updateText}
                                     onSearchResultComplete={handleSearchComplete}
                ></StatefulSearchInput>
            </div>
            <div className="md:container md:mx-auto md:mt-5 flex justify-center border-2 border-sky-500">
                <div>CardList</div>
            </div>
            <div className="md:container md:mx-auto md:mt-1 flex justify-center border-2 border-sky-500">
                <SummaryCardList cards={contacts}></SummaryCardList>
            </div>
        </div>
    )
}