"use client"

import { usePlace } from "../../components/Context/placeContext"
import { Map } from "@/src/components/maps/map"

export default function DateViewPage() {
    const { places } = usePlace();

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="w-80 bg-white shadow-lg p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Your Date Places</h2>
                
                <div className="space-y-2">
                    {places.map((place, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <h3 className="font-medium">{place.place.displayName.text}</h3>
                            {place.place.formattedAddress && (
                                <p className="text-sm text-gray-600">{place.place.formattedAddress}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <Map waypoints={places} />
            </div>
        </div>
    );
}