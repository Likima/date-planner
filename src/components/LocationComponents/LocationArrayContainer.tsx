import { Place } from "@/types";
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
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-500 ease-in-out
            ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`overflow-y-auto h-[80vh] max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 
                rounded-lg shadow-lg border border-purple-300/20 transform transition-all duration-500 ease-in-out
                ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <h1 className="text-3xl font-bold text-center text-white">Places around you!</h1>
                {data && data.length > 0 ? (
                    data.map((item: Place) => (
                        <LocationArrayEntry
                            key={item.id}
                            item={item}
                            onClick={showMoreDetails}
                        />
                    ))
                ) : (
                    <div className="text-white text-center">
                        No places found in this area
                    </div>
                )}
                <button
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
                    onClick={() => { navBack(false) }}
                >
                    Back to Planning...
                </button>
            </div>
        </div>
    );
}