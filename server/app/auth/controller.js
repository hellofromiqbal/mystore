const User = require('../user/model');
const bcrypt = require('bcrypt');

const store = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    
    const isEmailExist = await User.findOne({ email });
    if(isEmailExist) {
      return res.status(409).json({
        message: 'Email already exist.'
      });
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role
    });

    return res.status(201).json({
      message: 'New user created!',
      data: newUser
    });
  } catch (error) {
    return res.status(500).json({
      message: err.message
    });
  };
};

module.exports = { store };