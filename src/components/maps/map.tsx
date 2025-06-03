"use client"

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"
import { useLocation } from "../Context/locationContext";

type Coordinate = {
    lat: number;
    lng: number;
}

export function Map(props: { waypoints: Coordinate[] }) {
    const { coords } = useLocation();
    const mapContainer = useRef(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

        if (mapContainer.current && !mapRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v11",
                center: coords ? [coords.lng, coords.lat] : [-123.12, 49.28],
                zoom: 10,
                attributionControl: false,
            });

            map.on('load', () => {
                setMapLoaded(true);
            });

            mapRef.current = map;

            return () => {
                map.remove();
                mapRef.current = null;
            };
        }
    }, [coords]);

    useEffect(() => {
        if (!mapLoaded || !mapRef.current) return;

        console.log('Waypoints received:', props.waypoints);

        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (props.waypoints.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();
            props.waypoints.forEach(waypoint => {
                bounds.extend([waypoint.lng, waypoint.lat]);
            });
            mapRef.current.fitBounds(bounds, { padding: 50 });

            props.waypoints.forEach(waypoint => {
                console.log('Adding marker at:', waypoint);
                const marker = new mapboxgl.Marker()
                    .setLngLat([waypoint.lng, waypoint.lat])
                    .addTo(mapRef.current!);
                markersRef.current.push(marker);
            });

        }
    }, [props.waypoints, mapLoaded]);

    return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} className="z-10" />;
}

export default Map;