import environment from "./config/env.js";
import app from "./app.js";

/******** PORT Define *******/
const PORT = process.env.API_GATEWAY_PORT || 5000;


/*********** Start The Server ***********/
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT} in ${environment} mode`);
  });
