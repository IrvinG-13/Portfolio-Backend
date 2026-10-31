
import prisma from "../config/prisma.js";

// GET: Obtener todos los proyectos
export const obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await prisma.proyecto.findMany({
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json(proyectos);
    } catch (error) {
        console.error("Error obteniendo proyectos:", error);
        return res.status(500).json({
            message: "Error al obtener los proyectos"
        });
    }
};

// GET: Obtener proyectos destacados
export const obtenerDestacados = async (req, res) => {
    try {
        const proyectos = await prisma.proyecto.findMany({
            where: {
                destacado: true
            },
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json(proyectos);
    } catch (error) {
        console.error("Error obteniendo destacados:", error);
        return res.status(500).json({
            message: "Error al obtener los proyectos destacados"
        });
    }
};

// POST: Crear un proyecto
export const crearProyecto = async (req, res) => {
    try {
        const {
            titulo,
            descripcion,
            tecnologias,
            imagenUrl,
            repoUrl,
            demoUrl,
            destacado
        } = req.body;

        if (!titulo || !descripcion || !tecnologias) {
            return res.status(400).json({
                message: "Título, descripción y tecnologías son obligatorios"
            });
        }

        const proyecto = await prisma.proyecto.create({
            data: {
                titulo,
                descripcion,
                tecnologias,
                imagenUrl: imagenUrl || null,
                repoUrl: repoUrl || null,
                demoUrl: demoUrl || null,
                destacado: destacado ?? false
            }
        });

        return res.status(201).json(proyecto);
    } catch (error) {
        console.error("Error creando proyecto:", error);
        return res.status(500).json({
            message: "Error al crear el proyecto"
        });
    }
};

// PUT: Actualizar un proyecto
export const actualizarProyecto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID de proyecto inválido"
            });
        }

        const {
            titulo,
            descripcion,
            tecnologias,
            imagenUrl,
            repoUrl,
            demoUrl,
            destacado
        } = req.body;

        const datosActualizados = {};

        if (titulo !== undefined) datosActualizados.titulo = titulo;
        if (descripcion !== undefined) datosActualizados.descripcion = descripcion;
        if (tecnologias !== undefined) datosActualizados.tecnologias = tecnologias;
        if (imagenUrl !== undefined) datosActualizados.imagenUrl = imagenUrl;
        if (repoUrl !== undefined) datosActualizados.repoUrl = repoUrl;
        if (demoUrl !== undefined) datosActualizados.demoUrl = demoUrl;
        if (destacado !== undefined) datosActualizados.destacado = destacado;

        const proyecto = await prisma.proyecto.update({
            where: { id },
            data: datosActualizados
        });

        return res.status(200).json(proyecto);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Proyecto no encontrado"
            });
        }

        console.error("Error actualizando proyecto:", error);
        return res.status(500).json({
            message: "Error al actualizar el proyecto"
        });
    }
};

// DELETE: Eliminar un proyecto
export const eliminarProyecto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID de proyecto inválido"
            });
        }

        await prisma.proyecto.delete({
            where: { id }
        });

        return res.status(200).json({
            message: "Proyecto eliminado correctamente"
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Proyecto no encontrado"
            });
        }

        console.error("Error eliminando proyecto:", error);
        return res.status(500).json({
            message: "Error al eliminar el proyecto"
        });
    }
};
