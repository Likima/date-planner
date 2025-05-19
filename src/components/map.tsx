"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Map = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

    if (mapContainer.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-123.12, 49.28],
        zoom: 9,
        attributionControl: false, // Disable the footer
      });
    }
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} className = "z-10" />;
};

export default Map;
