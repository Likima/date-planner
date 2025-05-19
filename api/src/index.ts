import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { register } from "@reflet/express";
import { HelloRouter } from "@routes/example.route";
import auth from "./auth"

dotenv.config();

const PORT = process.env.API_PORT || 8001;

const app = express();

app.use(cors());
app.use(express.json());
register(app, [HelloRouter]);
auth(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));