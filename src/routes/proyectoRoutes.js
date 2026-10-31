
import { Router } from "express";

import {
    obtenerProyectos,
    obtenerDestacados,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
} from "../controllers/proyectoController.js";

import {
    verificarToken,
    verificarAdmin
} from "../middleware/authMiddleware.js";

const router = Router();

// Rutas públicas
router.get("/", obtenerProyectos);
router.get("/destacados", obtenerDestacados);

// Rutas protegidas: solamente el administrador
router.post("/", verificarToken, verificarAdmin, crearProyecto);
router.put("/:id", verificarToken, verificarAdmin, actualizarProyecto);
router.delete("/:id", verificarToken, verificarAdmin, eliminarProyecto);

export default router;
