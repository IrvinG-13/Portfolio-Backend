
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar los datos recibidos
        if (!username || !password) {
            return res.status(400).json({
                message: "Usuario y contraseña son obligatorios"
            });
        }

        // Buscar usuario en PostgreSQL
        const usuario = await prisma.usuario.findUnique({
            where: { username }
        });

        if (!usuario) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        // Comparar contraseña con el hash
        const passwordValida = await bcrypt.compare(
            password,
            usuario.passwordHash
        );

        if (!passwordValida) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        // Generar JWT
        const token = jwt.sign(
            {
                username: usuario.username,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "2h",
                issuer: process.env.JWT_ISSUER,
                audience: process.env.JWT_AUDIENCE
            }
        );

        return res.status(200).json({ token });

    } catch (error) {
        console.error("Error en login:", error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
