// auth.controller.js

import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// =========================
// CADASTRO
// =========================

export async function createUser(req, res) {

    try {

        const {
            nome,
            email,
            senha,
            tipo
        } = req.body;

        // VALIDAÇÃO
        if (!nome || !email || !senha || !tipo) {

            return res.status(400).json({
                erro: 'Nome, email, senha e tipo são obrigatórios'
            });

        }

        // VALIDA TIPO
        if (!['aluno', 'professor'].includes(tipo)) {

            return res.status(400).json({
                erro: 'Tipo inválido'
            });

        }

        // VERIFICA EMAIL
        const usuarioExistente = await User.findOne({
            where: { email }
        });

        if (usuarioExistente) {

            return res.status(409).json({
                erro: 'E-mail já cadastrado'
            });

        }

        // HASH SENHA
        const hashSenha = await bcrypt.hash(senha, 10);

        // CRIA USUÁRIO
        const userCreate = await User.create({

            nome,
            email,
            senha: hashSenha,
            tipo

        });

        // REMOVE SENHA
        const userSemSenha = userCreate.toJSON();

        delete userSemSenha.senha;

        return res.status(201).json({
            mensagem: 'Usuário criado com sucesso',
            usuario: userSemSenha
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: 'Erro interno do servidor'
        });

    }
}

// =========================
// LOGIN
// =========================

export async function login(req, res) {

    try {

        const { email, senha } = req.body;

        // VALIDAÇÃO
        if (!email || !senha) {

            return res.status(400).json({
                erro: 'E-mail e senha são obrigatórios'
            });

        }

        // BUSCA USUÁRIO
        const usuario = await User.findOne({
            where: { email }
        });

        // VERIFICA USUÁRIO
        if (!usuario) {

            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });

        }

        // CONTA DESATIVADA
        if (usuario.ativo === false) {

            return res.status(403).json({
                erro: 'Conta desativada'
            });

        }

        // VERIFICA SENHA
        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {

            return res.status(401).json({
                erro: 'Credenciais inválidas'
            });

        }

        // REMOVE SENHA
        const usuarioSemSenha = usuario.toJSON();

        delete usuarioSemSenha.senha;

        // GERA TOKEN JWT
        const token = jwt.sign(

            {
                id: usuario.id,
                tipo: usuario.tipo
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }

        );

        return res.status(200).json({

            mensagem: 'Acesso autorizado',

            token,

            usuario: usuarioSemSenha

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: 'Erro interno do servidor'
        });

    }
}