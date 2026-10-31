
import "dotenv/config";
import prisma from "./config/prisma.js";
import bcrypt from "bcryptjs";

async function crearAdmin() {
    try {
        const username = process.env.ADMIN_USERNAME;
        const password = process.env.ADMIN_PASSWORD;

        if (!username || !password || password.length < 12) {
            throw new Error(
                "Configura un usuario y una contraseña de al menos 12 caracteres"
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await prisma.usuario.upsert({
            where: { username },
            update: { passwordHash },
            create: {
                username,
                passwordHash,
                rol: "Admin"
            }
        });

        console.log("Administrador creado o actualizado correctamente");

    } catch (error) {
        console.error("Error creando administrador:", error);
    } finally {
        await prisma.$disconnect();
    }
}

crearAdmin();
