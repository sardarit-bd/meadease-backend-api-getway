import { verifyToken } from "../utils/jwt.js";


export const checkAuth = (...roles) =>
    async (req, res, next) => {
        try {
            const accessToken = req?.headers?.authorization || req?.cookies?.accessToken;
            console.log("Access Token:", accessToken);
            if (!accessToken) {
                return res.json({
                    success: false,
                    statusCode: 403,
                    message: "Missing Access Token"
                })
            }

            const verifiedToken = verifyToken(
                accessToken,
                process.env.JWT_ACCESS_SECRET
            );

            if (!verifiedToken) {
                return res.json({
                    success: false,
                    statusCode: 403,
                    message: "You are not authorized"
                })
            }

            if (!roles.includes(verifiedToken.role)) {
                return res.json({
                    success: false,
                    statusCode: 404,
                    message: "You are not permitted to this route!!!"
                })
            }

            // Attach user info to the request for forwarding
            req.user = verifiedToken;

            next();
        } catch (error) {
            next(error);
        }
    };