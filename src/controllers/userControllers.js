import User from '../model/user';

class UserController {
  async store(req, res) {
    try {
      await User.create(req.body);
      return res.status(200).json({ message: 'Usuario criado com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

  async show(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'ativo']
      });
      if (!users) {
        return res.status(400).json({ errors: 'Nenhum  usuario encontrado' });
      }
      return res.status(200).json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

  async index(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(400).json({ errors: 'Nenhum  usuario encontrado' });
      }
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
}

export default new UserController();
