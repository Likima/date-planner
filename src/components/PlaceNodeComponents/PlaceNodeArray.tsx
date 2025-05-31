import { PlaceNode } from "@/types"
import { PlaceNodeElement } from "./PlaceNodeElement"
import { CompareDates } from "@/src/core/comparisons"

interface PNA_Props {
    data: PlaceNode[] | null
}

export function PlaceNodeArray({ data }: PNA_Props) {
    return (
        <div className={`overflow-y-auto h-[50vh] max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20 transform transition-all duration-500 ease-in-out my-auto fixed right-8`}>
            <h1 className="text-3xl font-bold text-center text-gray-900">Your Current Date</h1>
            {
                data && data.length > 0 ?
                    (
                        data.sort((a, b) => {
                            return CompareDates(a.date, b.date)
                        }).map((item: PlaceNode) => (
                            <PlaceNodeElement
                                item={item}
                            />
                        ))
                    ) : (
                        <div>
                            No Places found in the area
                        </div>
                    )
            }
        </div>
    )
}