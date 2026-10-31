
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import contactoRoutes from "./routes/contactoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de mi portafolio funcionando correctamente"
    });
});

app.use("/api/Auth", authRoutes);
app.use("/api/Proyectos", proyectoRoutes);
app.use("/api/Contacto", contactoRoutes);

export default app;
