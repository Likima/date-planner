"use client"

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"
import { useLocation } from "../Context/locationContext";
import 'mapbox-gl/dist/mapbox-gl.css';

import { Marker } from "./marker"
import { PlaceNode } from "@/types";
import { LuAtom } from "react-icons/lu";

export function Map(props: { waypoints: PlaceNode[] }) {
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
                const lng = waypoint.place.location?.longitude ?? 0;
                const lat = waypoint.place.location?.latitude ?? 0;
                bounds.extend([lng, lat]);

                const marker = new mapboxgl.Marker({
                    color: "#FF0000"
                })
                    .setLngLat([lng, lat])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(
                                `<p>${waypoint.place.displayName.text} </p>`
                            )
                    )
                    .addTo(mapRef.current!);

                markersRef.current.push(marker);
                console.log('Marker added at:', [lng, lat]);
            });

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