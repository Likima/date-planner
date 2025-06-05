import express from 'express';
import axios from 'axios';

export default function searchPlaces(app: express.Application) {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    app.post('/search', async (req, res) => {
        const { latitude: lat, longitude: lng, search_request: search } = req.body;

        const radius = 500.0; // < just arbitrary ig

        if (!lat || !lng || !radius) { // added radius incase its a param later
            return res.status(400).json({ error: 'Missing lat, lng, or radius' });
        }

        try {
            const url = `https://places.googleapis.com/v1/places:autocomplete`;
            const response = await axios.post(url, {
                input: search,
                locationBias: {
                    center: {
                        latitude: lat,
                        longitude: lng
                    },
                    radius: radius,
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': GOOGLE_API_KEY,
                    'X-Goog-FieldMask': "*",
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