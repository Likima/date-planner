"use client"

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"
import { useLocation } from "../Context/locationContext";
import 'mapbox-gl/dist/mapbox-gl.css';

import { Marker } from "./marker"

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

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (props.waypoints.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();

            props.waypoints.forEach(waypoint => {
                // Add to bounds
                bounds.extend([waypoint.lng, waypoint.lat]);

                // Create marker
                const marker = new mapboxgl.Marker({
                    color: "#FF0000"  // Make markers more visible
                })
                    .setLngLat([waypoint.lng, waypoint.lat])
                    .addTo(mapRef.current!);

                markersRef.current.push(marker);
                console.log('Marker added at:', [waypoint.lng, waypoint.lat]);
            });

            // Fit bounds with padding
            mapRef.current.fitBounds(bounds, {
                padding: 100,
                maxZoom: 15
            });
        }
    }, [props.waypoints, mapLoaded]);

    return (
        <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} className="z-10" />
    );
}