import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";


export async function getPerfil(req, res) {
    try {
        const usuario = await User.findByPk(req.usuario.id, {
            attributes: {
                exclude: ["senha"]
            }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        return res.status(200).json(usuario);

    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
};

export async function updatePerfil(req, res) {
    try {
        const { nome, email, novaSenha } = req.body;

        const usuario = await User.findByPk(req.usuario.id);

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        if (nome) usuario.nome = nome;
        if (email) usuario.email = email;

        if (novaSenha) {
            const hashSenha = await bcrypt.hash(novaSenha, 10);
            usuario.senha = hashSenha;
        }

        await usuario.save();

        const usuarioSemSenha = usuario.toJSON();
        delete usuarioSemSenha.senha;

        return res.status(200).json(usuarioSemSenha);

    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
};

export async function deleteConta(req, res) {
    try {
        const usuario = await User.findByPk(req.usuario.id);

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        usuario.ativo = false;
        await usuario.save();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
};