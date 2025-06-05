"use client"

import { usePlace } from "../../components/Context/placeContext"
import { Map } from "@/src/components/maps/map"

export default function DateViewPage() {
    const { places } = usePlace();

    const coordinates = places.map(place => ({
        lat: place?.place?.location?.latitude ?? 0,
        lng: place?.place?.location?.longitude ?? 0,
    }));

    return (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden">
            <Map waypoints={coordinates} />
        </div>
    );
}