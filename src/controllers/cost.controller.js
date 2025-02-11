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
    let { description, category, userid, sum, createdAt } = req.body;
    /*category = category.toLowerCase();*/

    if (!description || !category || !userid || sum === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newCost = new Cost({ 
      description, 
      category, 
      userid, 
      sum, 
      createdAt: createdAt ? new Date(createdAt) : undefined // ✅ אם נשלח תאריך, השתמש בו; אחרת השתמש בברירת המחדל של הסכימה
    });

    await newCost.save();
    res.status(201).json(newCost);
  } catch (error) {
    res.status(500).json({ message: 'Error adding cost item: ' + error.message });
  }
};


const getMonthlyReport = async (req, res) => {
  const { id, year, month } = req.query;
  if (!id || !year || !month) {
    return res.status(400).json({ error: 'Please provide id, year, and month.' });
  }

  try {
    const costs = await Cost.aggregate([
      {
        $match: {
          userid: id,
          createdAt: {
            $gte: new Date(`${year}-${month}-01`),
            $lt: new Date(`${parseInt(year) + 1}-${month}-01`),
          },
        },
      },
      {
        $group: {
          _id: { category: '$category' },
          costs: {
            $push: { sum: '$sum', description: '$description', day: { $dayOfMonth: '$createdAt' } },
          },
        },
      },
      {
        $project: { category: '$_id.category', costs: 1, _id: 0 },
      },
    ]);

    if (costs.length === 0) {
      return res.status(404).json({ error: 'No costs found for this user in this month.' });
    }

    const report = { userid: id, year, month, costs };
    return res.json(report);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export default { getCosts, addCost, getMonthlyReport };
