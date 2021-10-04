/* eslint-disable camelcase */
import { Op } from 'sequelize';
import Bill from '../model/bills';
import Creditor from '../model/creditor';
import User from '../model/user';

class BillControllers {
  async store(req, res) {
    try {
      const bills = [];
      const { total_installment, description, value, creditor_id, type_bill, expiration_date } =
        req.body;
      const creditor = await Creditor.findOne({
        where: {
          [Op.and]: [{ id: creditor_id }, { active: true }]
        }
      });
      if (!creditor) {
        return res.status(400).json({ errors: 'Credor não encontrado' });
      }
      for (let i = 0; i < total_installment; i++) {
        if (i !== 0) {
          const day = new Date(bills[i - 1].expiration_date);
          day.setDate(day.getDate() + 30);
          const bill = {
            description,
            value,
            installment: i + 1,
            total_installment,
            user_id: req.userId,
            creditor_id,
            type_bill,
            expiration_date: day,
            paid: false
          };
          bills.push(bill);
        } else {
          const bill = {
            description,
            value,
            installment: i + 1,
            total_installment,
            user_id: req.userId,
            creditor_id,
            type_bill,
            expiration_date: new Date(expiration_date),
            paid: false
          };
          bills.push(bill);
        }
      }

      const newsBills = await Bill.bulkCreate(bills);
      return res.status(200).json(newsBills);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map(err => err.message) });
    }
  }

  async index(req, res) {
    try {
      const bills = await Bill.findAll({
        where: {
          user_id: req.userId
        },
        attributes: [
          'id',
          'description',
          'value',
          'installment',
          'total_installment',
          'type_bill',
          'expiration_date',
          'paid',
          'active'
        ],
        include: [
          {
            model: User,
            attributes: ['id', 'nome']
          },
          {
            model: Creditor,
            attributes: ['id', 'nome']
          }
        ]
      });
      if (!bills.length) {
        return res.status(200).json({ message: 'Nenhuma conta encontrada' });
      }
      return res.status(200).json(bills);
    } catch (error) {
      return res.status(400).json({ errors: e.errors.map(err => err.message) });
    }
  }

  async show(req, res) {
    try {
      const bills = await Bill.findOne({
        where: {
          [Op.and]: [{ user_id: req.userId, id: req.params.id }]
        },
        attributes: [
          'id',
          'description',
          'value',
          'installment',
          'total_installment',
          'type_bill',
          'expiration_date',
          'paid',
          'active'
        ],
        include: [
          {
            model: User,
            attributes: ['id', 'nome']
          },
          {
            model: Creditor,
            attributes: ['id', 'nome']
          }
        ]
      });
      if (!bills) {
        return res.status(200).json({ message: 'Nenhuma conta encontrada' });
      }
      return res.status(200).json(bills);
    } catch (error) {
      return res.status(400).json({ errors: e.errors.map(err => err.message) });
    }
  }

  async update(req, res) {
    try {
      const bill = await Bill.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!bill) {
        return res.status(200).json({ message: 'Conta não encontrada' });
      }

      return res.status(200).json(bills);
    } catch (error) {
      return res.status(400).json({ errors: e.errors.map(err => err.message) });
    }
  }
}

export default new BillControllers();
