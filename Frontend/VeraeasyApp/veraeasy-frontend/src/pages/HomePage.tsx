import './HomePage.scss';
import {SkeletonCard} from "@/components/SkeletonCard.tsx";
import SearchInput from "@/components/SearchInput.tsx";


export default function HomePage() {
    return (
        <div className="bg-gray-100	min-h-screen flex flex-col m-0 p-0  border-2 border-sky-500">
            <div className="md:container md:mx-auto flex justify-center border-2 border-sky-500">
                <div>Header</div>
            </div>
            <div className="md:container md:mx-auto md:mt-5 flex justify-center border-2 border-sky-500">
                <SearchInput></SearchInput>
            </div>
            <div className="md:container md:mx-auto md:mt-5 flex justify-center border-2 border-sky-500">
                <div>CardList</div>
            </div>
            <div className="md:container md:mx-auto md:mt-1 flex justify-center border-2 border-sky-500">
                <h3></h3>
                <div className="grid gap-4 grid-cols-3 auto-rows-auto">
                    <div className="card">
                        <SkeletonCard></SkeletonCard>
                    </div>
                    <div className="card">
                        <SkeletonCard></SkeletonCard>
                    </div>
                    <div className="card">
                        <SkeletonCard></SkeletonCard>
                    </div>
                    <div className="card">
                        <SkeletonCard></SkeletonCard>
                    </div>
                    <div className="card">
                        <SkeletonCard></SkeletonCard>
                    </div>
                    <div className="card">
                        <SkeletonCard></SkeletonCard>
                    </div>
                </div>
            </div>
        </div>
    )
}