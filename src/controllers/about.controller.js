export const getAbout = async (req, res) => {
    try {
      const team = [
        { "first_name": "Shir", "last_name": "Oziel" },
        { "first_name": "Yarden", "last_name": "Kahlon Avital" }
      ];
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  