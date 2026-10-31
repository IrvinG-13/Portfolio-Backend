
import { Router } from "express";

import {
    crearMensaje,
    obtenerMensajes,
    marcarComoLeido,
    eliminarMensaje
} from "../controllers/contactoController.js";

import {
    verificarToken,
    verificarAdmin
} from "../middleware/authMiddleware.js";

const router = Router();

// Ruta pública
router.post("/", crearMensaje);

// Rutas protegidas
router.get("/", verificarToken, verificarAdmin, obtenerMensajes);
router.put("/:id/leido", verificarToken, verificarAdmin, marcarComoLeido);
router.delete("/:id", verificarToken, verificarAdmin, eliminarMensaje);

export default router;
