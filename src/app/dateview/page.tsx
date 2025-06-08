"use client"

import { usePlace } from "../../components/Context/placeContext"
import { Map } from "@/src/components/maps/map"
import { useLocation } from "@/src/components/Context/locationContext";

export default function DateViewPage() {
    const { places } = usePlace();
    const { coords } = useLocation();

    async function autocomplete(rad: number, search: string) {
        // pass the radius and do something with it later lmao

        try {
            const response = await fetch('http://localhost:8001/autocomplete', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    latitude: coords?.lat,
                    longitude: coords?.lng,
                    search_request: search,
                    radius: rad
                }),
                credentials: 'include'
            });

            console.log(response.body)

        } catch (error) {
            console.error("Error autocompleting:", error);
        }

    }

    return (
        <div className="flex h-screen w-screen overflow-hidden text-black">
            <div className="w-80 bg-white shadow-lg p-4 overflow-y-auto">

                <h2 className="text-xl font-bold mb-4 mt-20">Your Date Places</h2>
                <h2 className="text-xl font-bold mb-4"> What is your starting location? </h2>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Search for a location..."
                        onChange={(e) => autocomplete(5000, e.target.value)}
                    />
                </div>
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