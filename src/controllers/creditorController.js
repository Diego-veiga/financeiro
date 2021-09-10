import { Op } from 'sequelize';
import Creditor from '../model/creditor';

class CreditorController {
  async store(req, res) {
    try {
      const { nome } = req.body;

      const newCreditor = await Creditor.create({ nome, userId: req.userId });
      return res.status(200).json(newCreditor);
    } catch (e) {
      return res.status(400).json({
        erros: e.erros.map(err => err.message)
      });
    }
  }

  async index(req, res) {
    try {
      const Crediutors = await Creditor.findAll({
        attributes: ['id', 'nome', 'userId', 'active']
      });
      return res.status(200).json(Crediutors);
    } catch (e) {
      return res.status(400).json({
        erros: e.erros.map(err => err.message)
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const creditor = await Creditor.findOne({
        where: { id },
        attributes: ['id', 'nome', 'userId', 'active']
      });
      return res.status(200).json(creditor);
    } catch (e) {
      return res.status(400).json({
        erros: e.erros.map(err => err.message)
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const creditor = await Creditor.findOne({
        where: {
          [Op.and]: [{ id }, { active: true }]
        }
      });
      if (!creditor) {
        return res.status(400).json({ errors: 'Creditor não encontrado' });
      }
      const creditorUpdated = await creditor.update(req.body);
      return res.status(200).json(creditorUpdated);
    } catch (e) {
      return res.status(400).json({
        erros: e.erros.map(err => err.message)
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const creditor = await Creditor.findOne({
        where: { id }
      });
      if (!creditor) {
        return res.status(400).json({ errors: 'Creditor não encontrado' });
      }
      creditor.active = false;
      await creditor.save();
      return res.status(200).json({ message: 'Credor Excluído com sucesso' });
    } catch (e) {
      return res.status(400).json({
        erros: e.erros.map(err => err.message)
      });
    }
  }
}

export default new CreditorController();
