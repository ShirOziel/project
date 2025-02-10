import { Cost } from '../models/cost.js';
import { User } from '../models/user.js';

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, birthday, marital_status } = req.body;
    if (!first_name || !last_name || !birthday || !marital_status) {
      return res.status(400).json({
        message:
          'All fields are required: first_name, last_name, birthday, marital_status.',
      });
    }

    const created = new User(req.body);
    console.log('created', created);

    await created.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalCost = await Cost.aggregate([
      { $match: { userid: req.params.id } },
      { $group: { _id: null, total: { $sum: "$sum" } } }
    ]);

    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.id,
      total: totalCost.length > 0 ? totalCost[0].total : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// ייצוא כל הפונקציות כולל getUserDetails
export { getUsers, createUser, getUserDetails };
