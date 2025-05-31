import axios from 'axios';
import express from 'express';


export default function getDirections(app: express.Application) {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

    app.post('/directions', async (req, res) => {
        const places = req.body.places;

        if (!places) {
            return res.status(400).json({ error: "Null array or empty array." })
        }

        try {
            const url = 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix'
            const origins = places.map((place: any) => ({
                waypoint: {
                    location: {
                        latLng: {
                            latitude: place.place.lat,
                            longitude: place.place.lng
                        }
                    }
                }
            }));

            const destinations = [...origins];

            const response = await axios.post(url, {
                origins,
                destinations,
                travelMode: "DRIVE",
                routingPreference: "TRAFFIC_AWARE"
            }, {
                headers: {
                    'X-Goog-Api-Key': GOOGLE_API_KEY,
                    'X-Goog-FieldMask': 'originIndex,destinationIndex,duration,distanceMeters',
                    'Content-Type': 'application/json'
                }
            });
            res.json({
                destinations: response.data || []
            });
        } catch (error: any) {
            console.error('Error fetching places:', error.message);
            res.status(500).json({ error: 'Failed to fetch places' });
        }
    })
}