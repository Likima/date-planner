import express from 'express';
import axios from 'axios';

export default function findPlaces(app: express.Application) {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    app.post('/places', async (req, res) => { // more general search
        const lat = req.body.latitude;
        const lng = req.body.longitude;
        const radius = req.body.radius;

        if (!lat || !lng || !radius) {
            return res.status(400).json({ error: 'Missing lat, lng, or radius' });
        }

        try {
            const url = `https://places.googleapis.com/v1/places:searchNearby`;
            const response = await axios.post(url, {
                locationRestriction: {
                    circle: {
                        center: {
                            latitude: lat,
                            longitude: lng
                        },
                        radius: Number(radius * 1000)
                    }
                },
                includedTypes: ["restaurant", "cafe"],
                rankPreference: "POPULARITY"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': GOOGLE_API_KEY,
                    'X-Goog-FieldMask': "*",
                }
            });
            res.json({
                plc: response.data || []
            });
        } catch (error: any) {
            console.error('Error fetching places:', error.message);
            res.status(500).json({ error: 'Failed to fetch places' });
        }
    });

    app.post('/places/specific', async (req, res) => {
        const search = req.body.search;
        try {
            const url = `https://places.googleapis.com/v1/places:searchText`;
            const response = await axios.post(url, {
                textQuery: search,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': GOOGLE_API_KEY,
                    'X-Goog-FieldMask': "*",
                }
            });
            res.json({
                plc: response.data || []
            });
        } catch (error: any) {
            console.error('Error fetching places:', error.message);
            res.status(500).json({ error: 'Failed to fetch places' });
        }
    });
}