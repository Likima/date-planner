"use client"

import React from "react";

import { Place } from "../types/types";

export function LocationDisplay(props: { data: Place | null }) {
    if (!props.data) {
        return <div>No data recieved!</div>
    }
    return (
        <div className="p-4 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">{props.data.displayName.text}</h1>

            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Address</h2>
                    <p className="text-gray-600">{props.data.formattedAddress}</p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Contact</h2>
                    <p className="text-gray-600">{props.data.nationalPhoneNumber}</p>
                    {props.data.websiteUri && (
                        <a href={props.data.websiteUri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Website
                        </a>
                    )}
                </div>

                {props.data.currentOpeningHours && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Status</h2>
                        <p className="text-gray-600">
                            {props.data.currentOpeningHours.openNow ?
                                <span className="text-green-600">Open Now</span> :
                                <span className="text-red-600">Closed</span>
                            }
                        </p>
                    </div>
                )}

                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Rating</h2>
                    <p className="text-gray-600">
                        <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            {props.data.rating}
                            {' '}
                            ({props.data.userRatingCount} reviews)
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}