import { getDistance } from "@/src/core/distanceFunctions";
import { Place } from "@/types";
import React from "react";


export function LocationArrayEntry(props: { key: string, item: Place, onClick: (e: React.FormEvent, item: Place) => void }) {
    return (
        <button
            key={props.item.id}
            className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4 hover:bg-white/30 transition-all duration-300"
            onClick={(e) => { props.onClick(e, props.item) }}
        >
            <h3 className="text-xl font-semibold text-white mb-2">
                {`${props.item.displayName.text} (${getDistance(props.item.location?.longitude, props.item.location?.latitude)}km)`}
            </h3>
            <p className="text-gray-200 text-sm mb-2">
                {props.item.formattedAddress}
            </p>
            <div className="flex justify-between props.items-center text-sm text-gray-300">
                <span className="flex props.items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {props.item.priceLevel === 'PRICE_LEVEL_FREE' ? 'Free' :
                        props.item.priceLevel === 'PRICE_LEVEL_INEXPENSIVE' ? '$' :
                            props.item.priceLevel === 'PRICE_LEVEL_MODERATE' ? '$$' :
                                props.item.priceLevel === 'PRICE_LEVEL_EXPENSIVE' ? '$$$' :
                                    props.item.priceLevel === 'PRICE_LEVEL_VERY_EXPENSIVE' ? '$$$$' : 'Price Level Unavailable'}
                </span>
                {props.item.rating && (
                    <span className="flex props.items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        {props.item.rating}
                    </span>
                )}
            </div>
        </button>
    )
}