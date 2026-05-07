import { Op } from 'sequelize';

import Aluno from '../models/aluno.model.js';
import Turma from '../models/turma.model.js';
import { User } from '../models/user.model.js';

export async function getAlunosEmRisco(req, res) {

    try {

        const alunosEmRisco = await Aluno.findAll({

            attributes: ['mediaGeral'],

            where: {
                mediaGeral: {
                    [Op.lt]: 6.0
                }
            },

            include: [

                {
                    model: User,
                    attributes: ['nome', 'email']
                },

                {
                    model: Turma,

                    attributes: ['nome', 'semestre'],

                    where: {
                        [Op.or]: [
                            { semestre: 1 },
                            { semestre: 2 }
                        ]
                    }
                }
            ],

            order: [['mediaGeral', 'ASC']]
        });

        return res.status(200).json({
            total: alunosEmRisco.length,
            alunos: alunosEmRisco
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: 'Erro interno do servidor'
        });

    }
}