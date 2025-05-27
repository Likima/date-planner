import { Place } from "@/src/types/types";
import React from "react";
import { LocationArrayEntry } from "./LocationArrayEntry";

interface LAC_Props {
    data: Place[] | null;
    showMoreDetails: (e: React.FormEvent, item: Place) => void;
    navBack: (value: boolean) => void;
    visible: boolean;
}

export function LocationArrayContainer({ data, showMoreDetails, navBack, visible }: LAC_Props) {
    return (
        <div className={`overflow-y-auto h-[50vh] max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20 transform transition-all duration-500 ease-in-out my-auto fixed right-8 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
            <h1 className="text-3xl font-bold text-center text-gray-900">Places around you!</h1>
            {data && data.length > 0 ? (
                data.map((item: Place) => (
                    <LocationArrayEntry
                        key={item.id}
                        item={item}
                        onClick={showMoreDetails}
                    />
                ))) : (
                <div className="text-white text-center">
                    No places found in this area
                </div>)}
            <button
                className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 m-10}`}
                onClick={() => { navBack(false) }}
            >
                Back to Planning...
            </button>
        </div>
    )
}