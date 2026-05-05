import { Router } from "express";
import * as c from '../controllers/auth.controller.js';
import { limitadorGetUser } from "../config/rateLimit.js";

const routerUser = Router();

routerUser.post('/cadastro', limitadorGetUser, c.createUser);
routerUser.post('/login', limitadorGetUser, c.login);

export default routerUser;