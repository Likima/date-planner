"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface GeolocationPosition {
  coords: Coordinates;
}

interface GeolocationError {
  code: number;
  message: string;
}

function errors(err: GeolocationError): void {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const Map = () => {

  function success(pos: GeolocationPosition): void {
    var crd = pos.coords;
    setLocation({
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: crd.accuracy
    });
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);

  useEffect(() => {
    console.log('Location state updated:', location);
  }, [location]);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
        })
    } else {
      console.log("Geolocation not supported");
    }
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            // implement denied later
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      mapRef.current?.setCenter([location.longitude, location.latitude]);
    }
    console.log("set location!")
  }, [location]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

    if (mapContainer.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: location ? [location.longitude, location.latitude] : [-123.12, 49.28],
        zoom: 12,
        attributionControl: false,
      });
    }
    if (location) {
      console.log("hello world! ")
    }
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} className="z-10" />;
};

export default Map;
