"use client"

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"
import { useLocation } from "../Context/locationContext";

type Coordinate = {
  lat: number;
  lng: number;
}

export function Map(props: {waypoints: Coordinate[]}) {
    const { coords } = useLocation();
    const mapContainer = useRef(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    useEffect(() => {
        if (mapRef.current) {
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            props.waypoints.forEach(waypoint => {
                const marker = new mapboxgl.Marker()
                    .setLngLat([waypoint.lng, waypoint.lat])
                    .addTo(mapRef.current!);
                markersRef.current.push(marker);
            });
        }
    }, [props.waypoints]);
    
    useEffect(() => {
        if (coords && mapRef.current) {
            mapRef.current.setCenter([coords.lng, coords.lat]);
        }
    }, [coords]);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

        if (mapContainer.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v11",
                center: coords ? [coords.lng, coords.lat] : [-123.12, 49.28],
                zoom: 12,
                attributionControl: false,
            });
        }
    }, []);

    return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} className="z-10" />;
};

export default Map;