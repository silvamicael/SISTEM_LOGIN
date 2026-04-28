import { Router } from "express";
import { authJWT, checkRole } from "../middleware/auth.middleware.js";
import * as c from "../controllers/user.controller.js";

const router = Router();

router.get("/perfil", authJWT, c.getPerfil);
router.put("/perfil", authJWT, c.updatePerfil);
router.delete("/conta", authJWT, c.deleteConta);

export default router;