import { PlaceNode } from "@/types"
import { PlaceNodeElement } from "./PlaceNodeElement"
import { CompareDates } from "@/src/core/comparisons"

interface PNA_Props {
    data: PlaceNode[] | null
}

export function PlaceNodeArray({ data }: PNA_Props) {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Your Current Date
            </h1>
            {data && data.length > 0 ? (
                <div className="space-y-4">
                    {data
                        .sort((a, b) => CompareDates(a.date, b.date))
                        .map((item: PlaceNode) => (
                            <PlaceNodeElement
                                key={`${item.date}-${item.place.name}`}
                                item={item}
                            />
                        ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">
                        No places added to your date plan yet
                    </p>
                </div>
            )}
        </div>
    )
}