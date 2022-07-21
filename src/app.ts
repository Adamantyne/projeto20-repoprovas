import express,{ json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";

import routers from "./routes/index.js";
import handleError from "./middlewares/handleError.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(routers);
app.use(handleError);

export default app;