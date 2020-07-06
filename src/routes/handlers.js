const User = require('./../models');
const insertUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      res.status(401).json({ message: 'Username is required' });
    } else if (!password) {
      res.status(401).json({ message: 'Password is required' });
    }
    new User({ username, password }).save();
    res.status(200).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'User not created' });
  }
};

const fetchUser = async (req, res) => {
  try {
    if (req.params.username) {
      const username = req.params.username;
      const user = await User.findOne({ username: username }, (err, data) => {
        if (err) return;
        res.status(200).json(data);
      });
    } else {
      res.status(500).json({ message: 'The username should be provided' });
    }
  } catch (error) {
    res.status(500).json({ message: 'User not created' });
  }
};

module.exports = { insertUser, fetchUser };
