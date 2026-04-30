import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


export async function createUser(req, res) {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: "Nome, email e senha são obrigatórios"
            });
        }

        const usuarioExistente = await User.findOne({
            where: { email }
        });

        if (usuarioExistente) {
            return res.status(409).json({
                erro: "E-mail já cadastrado"
            });
        }
        const hashSenha = await bcrypt.hash(senha, 10);

        const userCreate = await User.create({
            nome,
            email,
            senha: hashSenha
        });

        const userSemSenha = userCreate.toJSON();
        delete userSemSenha.senha;

        return res.status(201).json(userSemSenha);

    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
};

export async function login(req, res) {
    try {
        const { email, senha } = req.body;

        // Validação dos campos obrigatórios
        if (!email || !senha) {
            return res.status(400).json({
                erro: "E-mail e senha são obrigatórios"
            });
        }

        // Busca usuário pelo e-mail
        const usuario = await User.findOne({
            where: { email }
        });

        if (!usuario) {
            return res.status(400).json({
                erro: "Falha ao fazer login"
            });
        }

        // Verifica se a conta está desativada
        if (usuario.ativo === false) {
            return res.status(403).json({
                erro: "Conta desativada"
            });
        }

        // Compara a senha digitada com o hash salvo
        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                erro: "Credenciais inválidas"
            });
        }

        // Remove a senha antes de retornar
        const usuarioSemSenha = usuario.toJSON();
        delete usuarioSemSenha.senha;

        // Gera token JWT
        const token = jwt.sign(
            usuarioSemSenha,
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return res.status(200).json({
            mensagem: "Acesso autorizado",
            token,
            usuario: usuarioSemSenha
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
};
