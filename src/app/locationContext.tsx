"use client"

import { createContext, useState, useContext, ReactNode } from 'react';

type Coordinates = { lng: number, lat: number } | null;


const LocationContext = createContext<{
    coords: Coordinates; 
    setCoords: (coordinates: Coordinates) => void;
}>({
    coords: null,
    setCoords: () => {}
})

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [coords, setCoords] = useState<Coordinates>(null);
    return (
        <LocationContext.Provider value={{ coords, setCoords }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);