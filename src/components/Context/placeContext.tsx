"use client"

import { createContext, useState, useContext, ReactNode } from 'react';
import { PlaceNode } from '@/types';


const PlaceContext = createContext<{
    places: PlaceNode[];
    setPlaces: (pn: PlaceNode[]) => void;
}>({
    places: [],
    setPlaces: () => {}
})

export const PlaceProvider = ({ children }: { children: ReactNode }) => {
    const [places, setPlaces] = useState<PlaceNode[]>([]);
    return (
        <PlaceContext.Provider value={{ places, setPlaces }}>
            {children}
        </PlaceContext.Provider>
    );
};

export const usePlace = () => useContext(PlaceContext);