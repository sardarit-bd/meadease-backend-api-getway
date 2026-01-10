import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import applyRoutes from "./routes/index.js";


const app = express();
app.use(cookieParser());
app.use(express.json());



/*********** CORS  Middleware Here ***********/
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow non-browser requests
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);




applyRoutes(app);


// health check
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "api-getway",
        uptime: process.uptime(),
    });
});


app.use(errorHandler);
app.use(notFound);

export default app;
