import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../model/user';

class AuthController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          [Op.and]: [{ email }, { ativo: true }]
        }
      });
      if (!user) {
        return res.status(400).json({ errors: 'Usuario e senha inválidos' });
      }
      if (!(await user.passwordValid(password))) {
        return res.status(400).json({ errors: 'Usuario e senha inválidos' });
      }
      const { id, nome, sobrenome } = user;
      const token = await jwt.sign({ id, nome, sobrenome, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
      });

      return res.status(200).json({ token });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
}

export default new AuthController();
