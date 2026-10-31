
import prisma from "../config/prisma.js";

// POST: Recibir un mensaje de contacto
export const crearMensaje = async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;

        if (
            typeof nombre !== "string" ||
            typeof email !== "string" ||
            typeof mensaje !== "string" ||
            !nombre.trim() ||
            !email.trim() ||
            !mensaje.trim()
        ) {
            return res.status(400).json({
                message: "Nombre, email y mensaje son obligatorios"
            });
        }

        const nuevoMensaje = await prisma.mensajeContacto.create({
            data: {
                nombre: nombre.trim(),
                email: email.trim(),
                mensaje: mensaje.trim()
            }
        });

        return res.status(201).json(nuevoMensaje);
    } catch (error) {
        console.error("Error creando mensaje:", error);
        return res.status(500).json({
            message: "Error al enviar el mensaje"
        });
    }
};

// GET: Obtener todos los mensajes
export const obtenerMensajes = async (req, res) => {
    try {
        const mensajes = await prisma.mensajeContacto.findMany({
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json(mensajes);
    } catch (error) {
        console.error("Error obteniendo mensajes:", error);
        return res.status(500).json({
            message: "Error al obtener los mensajes"
        });
    }
};

// PUT: Marcar un mensaje como leído
export const marcarComoLeido = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID de mensaje inválido"
            });
        }

        const mensaje = await prisma.mensajeContacto.update({
            where: { id },
            data: { leido: true }
        });

        return res.status(200).json(mensaje);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Mensaje no encontrado"
            });
        }

        console.error("Error actualizando mensaje:", error);
        return res.status(500).json({
            message: "Error al actualizar el mensaje"
        });
    }
};

// DELETE: Eliminar un mensaje
export const eliminarMensaje = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID de mensaje inválido"
            });
        }

        await prisma.mensajeContacto.delete({
            where: { id }
        });

        return res.status(200).json({
            message: "Mensaje eliminado correctamente"
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Mensaje no encontrado"
            });
        }

        console.error("Error eliminando mensaje:", error);
        return res.status(500).json({
            message: "Error al eliminar el mensaje"
        });
    }
};
