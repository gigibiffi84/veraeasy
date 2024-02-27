import './HomePage.css';
import {SkeletonCard} from "@/components/SkeletonCard.tsx";


export default function HomePage() {
    return (
        <div className="parent border-2 border-sky-500">
            <div className="div1 border-2 border-sky-500">

            </div>
            <div className="div2 border-2 border-sky-500">
                <SkeletonCard></SkeletonCard>
            </div>
            <div className="div3 border-2 border-sky-500">
                <SkeletonCard></SkeletonCard>
            </div>
            <div className="div4 border-2 border-sky-500">
                <SkeletonCard></SkeletonCard>
            </div>
            <div className="div5 border-2 border-sky-500">
                <SkeletonCard></SkeletonCard>
            </div>
            <div className="div6 border-2 border-sky-500">
                <SkeletonCard></SkeletonCard>
            </div>
            <div className="div7 border-2 border-sky-500">
                <SkeletonCard></SkeletonCard>
            </div>
            <div className="div8 border-2 border-sky-500">
            </div>
        </div>
    );
}