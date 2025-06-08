import express from 'express';
import axios from 'axios';

export default function searchPlaces(app: express.Application) {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    app.post('/autocomplete', async (req, res) => {
        const { latitude: lat, longitude: lng, search_request: search } = req.body;

        const radius = req.body.radius; // < just arbitrary ig

        console.log(lat, lng, search)

        if (!lat || !lng || !radius) { // added radius incase its a param later
            return res.status(400).json({ error: 'Missing lat, lng, or radius' });
        }

        try {
            const url = `https://places.googleapis.com/v1/places:searchText`;
            const response = await axios.post(url, {
                textQuery: search,
                locationBias: {
                    rectangle: {
                        low: {
                            latitude: lat - radius / 111000,
                            longitude: lng - radius / (111000 * Math.cos(lat * Math.PI / 180))
                        },
                        high: {
                            latitude: lat + radius / 111000,
                            longitude: lng + radius / (111000 * Math.cos(lat * Math.PI / 180))
                        }
                    }
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': GOOGLE_API_KEY,
                    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location',
                }
            });
            res.json({
                search_response: response.data || []
            })
        } catch (error: any) {
            console.error("Error auto completing text", error.message);
            res.status(500).json({ error: "Error autocompleting search" })
        }
    });
}