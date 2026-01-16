import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import applyRoutes from "./routes/index.js";

const app = express();

/*********** Global Middleware ***********/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/*********** CORS Middleware ***********/
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(null, false);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

/*********** Routes ***********/
applyRoutes(app);

/*********** Health Check ***********/
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "api-gateway",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

/*********** Error Handling ***********/
app.use(notFound);
app.use(errorHandler);

export default app;
