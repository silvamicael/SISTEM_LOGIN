import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

import Turma from './turma.model.js';
import { User } from './user.model.js';

export const Aluno = sequelize.define(
    "Aluno",
    {
        mediaGeral: {
            type: DataTypes.FLOAT
        }
    },
    {
        tableName: "alunos",
        timestamps: true
    }
);

// =========================
// RELACIONAMENTO USER
// =========================

// Um usuário possui um aluno
User.hasOne(Aluno, {
    foreignKey: 'usuarioId'
});

// Um aluno pertence a um usuário
Aluno.belongsTo(User, {
    foreignKey: 'usuarioId'
});

// =========================
// RELACIONAMENTO TURMA
// =========================

Turma.hasMany(Aluno, {
    foreignKey: 'turmaId'
});

Aluno.belongsTo(Turma, {
    foreignKey: 'turmaId'
});

export default Aluno;