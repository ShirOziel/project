import { Cost } from '../models/cost.js';

const getCosts = async (req, res) => {
  try {
    const costs = await Cost.find();
    res.json(costs);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const addCost = async (req, res) => {
  try {
    const { description, category, userid, sum } = req.body;

    // בדיקה אם כל השדות חובה קיימים
    if (!description || !category || !userid || sum === undefined) {
      return res.status(400).json({
        message:
          'All fields are required: description, category, userid, and sum.',
      });
    }

    // יצירת מסמך חדש
    const newCost = Cost.create({
      sum,
      userid,
      category,
      description,
    });

    await newCost.save();
    res.status(201).json(newCost);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add cost: ' + error.message });
  }
};

export default { getCosts, addCost };
