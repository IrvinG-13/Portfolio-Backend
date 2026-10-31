
import "dotenv/config";
import prisma from "./config/prisma.js";

async function testDatabase() {
    try {
        await prisma.$connect();

        console.log("Conexión con PostgreSQL exitosa");

        const usuarios = await prisma.usuario.findMany();

        console.log("Usuarios registrados:", usuarios.length);

    } catch (error) {
        console.error("Error de conexión:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();
