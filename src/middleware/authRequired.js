import jwt from 'jsonwebtoken';
import Op from 'sequelize';
import User from '../model/user';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(400).json({ errors: 'token inválido' });
    }

    const [, token] = authorization.split(' ');
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = dados;
    const user = User.findOne({
      where: {
        [Op.and]: [{ id }, { ativo: true }]
      }
    });
    if (!user) {
      return res.status(400).json('Usuario e senha inválidos');
    }
    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(400).json({ errors: 'token inválido' });
  }
};
