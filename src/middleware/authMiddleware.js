
import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token no proporcionado"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        });

        req.usuario = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado"
        });
    }
};

export const verificarAdmin = (req, res, next) => {
    if (req.usuario?.rol !== "Admin") {
        return res.status(403).json({
            message: "No tienes permisos para realizar esta acción"
        });
    }

    next();
};
