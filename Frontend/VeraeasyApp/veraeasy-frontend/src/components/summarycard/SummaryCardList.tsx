import {SummaryCardPropsType} from "@/components/Types.ts";
import SummaryCard from "@/components/summarycard/SummaryCard.tsx";
import {SkeletonCard} from "@/components/SkeletonCard.tsx";
import {memo} from "react";

export type SummaryCardListPropsType = {
    cards: SummaryCardPropsType[];
}
const SummaryCardList = ({cards}: SummaryCardListPropsType) => {
    return (
        <>
            <div className="grid gap-4 grid-cols-3 auto-rows-auto">
                {cards.map((card, index) => {
                    return (
                        card && card.summary ?
                            <SummaryCard
                                className={card.className}
                                key={index}
                                summary={card.summary}></SummaryCard>
                            :
                            <div className="card" key={index}><SkeletonCard></SkeletonCard></div>
                    )
                })
                }
            </div>
        </>
    )
}

const MemoizedSummaryList = memo(SummaryCardList);

export default MemoizedSummaryList

