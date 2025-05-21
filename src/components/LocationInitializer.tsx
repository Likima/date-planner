"use client";

import { useEffect } from 'react';
import { useLocation } from "@/src/app/locationContext";

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

export const LocationInitializer = () => {
    const { setCoords } = useLocation();

    useEffect(() => {
        function success(pos: GeolocationPosition) {
            const crd = pos.coords;
            setCoords({
                lng: crd.longitude,
                lat: crd.latitude
            });
        }

        function error(err: GeolocationError) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    }, [setCoords]);

    return null;
};