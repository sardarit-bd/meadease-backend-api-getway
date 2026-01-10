import dotenv from "dotenv";
import path from "path";

const environment = process.env.NODE_ENV || "development";
const envPath = path.join(process.cwd(), `.env.${environment}`);
dotenv.config({ path: envPath });

export default environment;
