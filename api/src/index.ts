import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from "express";
import cors from "cors";
import { register } from "@reflet/express";
import { HelloRouter } from "@routes/example.route";
import auth from "./auth"
import findPlaces from "geolocation/places";
import searchPlaces from "geolocation/search";
import getDirections from "geolocation/directions";


const PORT = process.env.API_PORT || 8001;

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
register(app, [HelloRouter]);
auth(app);

// send the app to the defined routes
findPlaces(app);
getDirections(app);
searchPlaces(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));