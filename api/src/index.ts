import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from "express";
import cors from "cors";
import { register } from "@reflet/express";
import { HelloRouter } from "@routes/example.route";
import auth from "./auth"


const PORT = process.env.API_PORT || 8001;

const app = express();

app.use(cors());
app.use(express.json());
register(app, [HelloRouter]);
auth(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));