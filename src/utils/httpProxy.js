import { createProxyMiddleware } from "http-proxy-middleware";
import { SERVICES } from "./serviceRegistry.js";

export default function forward(service) {

    console.log(SERVICES)

    if (!SERVICES[service]) {
        throw new Error(`Unknown service requested: ${service}`);
    }

    return createProxyMiddleware({
        target: SERVICES[service],
        changeOrigin: true,
        pathRewrite: (path, req) => path.replace(/^\/[^/]+/, ""),
        onProxyReq(proxyReq, req) {



            // Forward auth token
            if (req.headers.authorization) {
                proxyReq.setHeader("x-access-token", req.headers.authorization);
            }

            // Forward user info from checkAuth middleware
            if (req.user) {
                proxyReq.setHeader("x-user-email", req.user.email);
                proxyReq.setHeader("x-user-role", req.user.role);
                proxyReq.setHeader("x-user-id", req.user.userId);
            }


            // Forward body data
            if (req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader("Content-Type", "application/json");
                proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
            }



        },
        logLevel: "debug"
    });
}
