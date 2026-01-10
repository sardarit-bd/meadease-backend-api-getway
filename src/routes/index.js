import authRoutes from "./auth.routes.js";
import patientRoutes from "./patient.routes.js";
import profileRoutes from "./profile.routes.js";


export default function applyRoutes(app) {
    app.use("/auth", authRoutes);
    app.use("/profile", profileRoutes);
    app.use("/patient", patientRoutes);

}
