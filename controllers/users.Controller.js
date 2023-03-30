const User = require('../models/User');

const register = async (req, res, next) => {
  console.log('Getting Registration Request');
  try {
    const { email } = req.body;
    console.log(req.body);
    const isUserExist = await User.find({ email: email });
    if (isUserExist.length !== 0) return res.status(400).send({ message: 'This user already exists' });
    const newUser = await User.create(req.body);
    res.status(200).send({ message: `Hello ${newUser.name} User created successfully` });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error.message });
  }
};

module.exports = {
  register,
};
