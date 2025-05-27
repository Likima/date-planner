export interface Place {
    name: string;
    id: string;
    types: string[];
    nationalPhoneNumber: string;
    internationalPhoneNumber: string;
    formattedAddress: string;
    addressComponents: null | any[];
    plusCode: null | string;
    location: null | {
        latitude: number;
        longitude: number;
    };
    viewport: null | any;
    rating: number;
    googleMapsUri: string;
    websiteUri: string;
    regularOpeningHours: null | {
        periods: any[];
        weekdayDescriptions: string[];
    };
    utcOffsetMinutes: number;
    adrFormatAddress: string;
    businessStatus: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
    priceLevel: 'PRICE_LEVEL_FREE' | 'PRICE_LEVEL_INEXPENSIVE' | 'PRICE_LEVEL_MODERATE' | 'PRICE_LEVEL_EXPENSIVE' | 'PRICE_LEVEL_VERY_EXPENSIVE';
    userRatingCount: number;
    iconMaskBaseUri: string;
    iconBackgroundColor: string;
    displayName: {
        text: string;
        languageCode: string;
    };
    primaryTypeDisplayName: null | {
        text: string;
        languageCode: string;
    };
    takeout: boolean;
    delivery: boolean;
    dineIn: boolean;
    servesBreakfast: boolean;
    currentOpeningHours: null | {
        openNow: boolean;
        periods: any[];
        weekdayDescriptions: string[];
    };
    primaryType: string;
    shortFormattedAddress: string;
    reviews: null | any[];
    photos: null | any[];
    servesCoffee: boolean;
    paymentOptions: null | {
        acceptsCreditCards?: boolean;
        acceptsDebitCards?: boolean;
        acceptsCash?: boolean;
    };
    parkingOptions: null | {
        freeParkingLot?: boolean;
        paidParkingLot?: boolean;
        streetParking?: boolean;
    };
    accessibilityOptions: null | {
        wheelchairAccessibleEntrance?: boolean;
        wheelchairAccessibleParking?: boolean;
    };
    addressDescriptor: null | any; // Could be more specific if needed
    googleMapsLinks: null | {
        directionsUri?: string;
        placeUri?: string;
    };
    priceRange: {
        startPrice?: number;
        endPrice?: number;
    };
    timeZone: null | {
        id: string;
        name: string;
    };
    postalAddress: null | {
        regionCode: string;
        languageCode: string;
        postalCode: string;
        administrativeArea: string;
        locality: string;
        addressLines: string[];
    };
}

// interface for the day the user wants to plan the date on.
export interface DateDayInfo {
    year: number | null,
    month: number | null,
    day: number | null
}

// interface for the start time and end time of a date / location ? 
export interface DateTimeInfo { // formatted in 24 hour time
    startTime: string | null,
    endTime: string | null
}

// interface that contains ALL the information of a place the user wants to go to
export interface PlaceNode {
    date: DateDayInfo | null,
    time: DateTimeInfo | null,
    place: Place
}
