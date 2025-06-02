import { PlaceNode } from "@/types"
import { PlaceNodeElement } from "./PlaceNodeElement"
import { CompareDates } from "@/src/core/comparisons"

interface PNA_Props {
    data: PlaceNode[] | null
}

export function PlaceNodeArray({ data }: PNA_Props) {
    return (
        <div className="p-10">
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
                            No places added to list
                        </div>
                    )
            }
        </div>
    )
}