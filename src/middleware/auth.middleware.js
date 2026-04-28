import jwt from 'jsonwebtoken';

async function authJWT(req, res, next) {
    try {
        
        const auth = req.headers['authorization'];
        // Verificando o Authorization no Header
        if(!auth.startsWith('Bearer ')){
            return res.status(401).json({error: 'Token não fornecido ou foi invalidado'})
        }

        // Tratando o Token
        const Token = auth.split(' ')[1];

        // Verificar (verify) o token
        const decoded = jwt.verify(Token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();

    } catch (error) {
        res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
}

function checkRole(role) {
  return function(req, res, next) {

    const role_user = req.usuario.role_user;

    // Verifica se o papel do usuário é igual ao papel exigido
    if (!role_user.includes(role)) {
      return res.status(403).json({
        erro: 'Acesso negado. Permissão insuficiente.'
      });
    }

    next();
  }
}

export { authJWT, checkRole }