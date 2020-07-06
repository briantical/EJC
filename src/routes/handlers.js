const User = require('./../models');

const insertUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      res.status(401).json({ message: 'Username is required' });
    } else if (!password) {
      res.status(401).json({ message: 'Password is required' });
    } else {
      const user = new User({ username, password });
      await user.save();
      res.status(200).json({ message: 'User created' });
    }
  } catch (err) {
    res.status(500).json({ message: 'User not created' });
  }
};

const fetchUser = async (req, res) => {
  try {
    if (req.params.username) {
      const _username = req.params.username;
      const data = await User.find({ username: _username });
      const { username, password } = data[0];
      const user = { username, password };
      res.status(200).json({ user });
    } else {
      res.status(500).json({ message: 'The username should be provided' });
    }
  } catch (error) {
    res.status(500).json({ message: 'User not created' });
  }
};

module.exports = { insertUser, fetchUser };
