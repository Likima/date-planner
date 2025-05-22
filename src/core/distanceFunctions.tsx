import { useLocation } from "@/src/app/locationContext"

const COORDINATE_TO_KM = 111.32;

export function distanceToKm(distance: number | undefined): number {
    if (!distance) return 0;
    return Math.round(distance * COORDINATE_TO_KM * 10) / 10;
}

export function getDistance(longitude: number | undefined, latitude: number | undefined) {
    const { coords } = useLocation();

    if (coords && coords.lng && coords.lat && longitude && latitude) {
        return distanceToKm(Math.pow(Math.pow(coords.lat - latitude, 2) + Math.pow(coords.lng - longitude, 2), 0.5))
    }
}