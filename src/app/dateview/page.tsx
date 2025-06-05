"use client"

import { usePlace } from "../../components/Context/placeContext"
import { Map } from "@/src/components/maps/map"

export default function DateViewPage() {
    const { places } = usePlace();

    return (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden">
            <Map waypoints={places} />
        </div>
    );
}