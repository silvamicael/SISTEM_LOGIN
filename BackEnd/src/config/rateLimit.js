import rateLimit from 'express-rate-limit';

// ========= Configurações Globais =========
export const limitadorGlobal = rateLimit({
    windowMs: 15*60*1000, // Janela de tempo para fazer algo
    max: 100, // Número máximo de requisições por IP
    message: {
        erro: 'Muita requisições por minuto',
    },
    standardHeaders: true, // Envia RateLimit-* nos headers
    legacyHeaders: false // Desativa o X-RateLimit-* antigo
});