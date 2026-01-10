import jwt from 'jsonwebtoken';

export const generateToken = (payload, secret) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: "10d"
    });

    return token
};

export const verifyToken = (token, secret) => {
    const verify = jwt.verify(token, secret)
    return verify
}