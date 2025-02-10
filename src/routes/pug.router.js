import express from 'express';
import { User } from './models/user.js';  // יש לוודא שהמודל של המשתמש קיים

const router = express.Router(); // יצירת Router חדש

// יצירת Route GET לקבלת פרטי משתמש לפי מזהה (id)
router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;  // שליפת מזהה המשתמש מה-URL (למשל /users/123)
  
  try {
    const user = await User.findOne({ id: userId }); // חיפוש המשתמש במסד הנתונים

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // אם לא נמצא, מחזירים שגיאה
    }

    // אם נמצא, שולחים את פרטי המשתמש
    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user: ' + error.message });
  }
});

export default router;
