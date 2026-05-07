import { Router } from 'express';

import {
    authJWT,
    checkRole
} from '../middleware/auth.middleware.js';

import * as c from '../controllers/aluno.controller.js';

const router = Router();

router.get(
    '/risco',
    authJWT,
    checkRole('professor'),
    c.getAlunosEmRisco
);

export default router;