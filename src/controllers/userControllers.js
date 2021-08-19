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
}

export default new UserController();