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
    // בדיקה אם כל השדות חובה קיימים
    if (
      !req.birthday ||
      !req.last_name ||
      !req.first_name ||
      !req.marital_status
    ) {
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

export default { getUsers, createUser };
