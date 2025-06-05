import { useEffect, useRef } from "react"
import mapboxgl from 'mapbox-gl'


interface MarkerProps {
    map: mapboxgl.Map | null;
    coordinates: [number, number];

}

export function Marker(props: MarkerProps) {

    const markerRef = useRef<mapboxgl.Marker | null>(null)

    useEffect(() => {
        if (props.map)
            markerRef.current = new mapboxgl.Marker()
                .setLngLat([props.coordinates[1], props.coordinates[0]])
                .addTo(props.map)

        return () => {
            if (!markerRef.current) return;
            markerRef.current.remove()
        }
    }, [])

    return null
}
