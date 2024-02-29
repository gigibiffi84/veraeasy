import {SkeletonCard} from "@/components/SkeletonCard.tsx";
import {memo} from "react";

const slots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const SkeletonCardList = () => {
    return (
        <>
            <div className="grid gap-4 grid-cols-3 auto-rows-auto">
                {slots.map((card) => {
                    return (

                        <div className="card" key={card}><SkeletonCard></SkeletonCard></div>
                    )
                })
                }
            </div>
        </>
    )
}

const MemoizedSkeletonCardList = memo(SkeletonCardList);

export default MemoizedSkeletonCardList

