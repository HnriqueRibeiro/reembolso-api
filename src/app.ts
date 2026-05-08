import "express-async-errors"
import express, { json } from "express";
import cors from "cors"
import {errorHandling} from "@/middlewares/error-handling"
import {routes} from "@/routes/index"

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes)
app.use(errorHandling)

export { app };
