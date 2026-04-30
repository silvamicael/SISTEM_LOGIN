import { Router } from "express";
import * as c from '../controllers/auth.controller.js';

const routerUser = Router();

routerUser.post('/cadastro', c.createUser);
routerUser.post('/login', c.login);

export default routerUser;