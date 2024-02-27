const User = require('../user/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/config');

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
      message: error.message
    });
  };
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password);
    if(!isUserExist || !isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    };
    
    const loginTokenPayload = {
      _id: isUserExist._id,
      fullname: isUserExist.fullname,
      email: isUserExist.email,
      role: isUserExist.role
    };

    const userSignInToken = jwt.sign(loginTokenPayload, secretKey, { expiresIn: '7d' });
    res.cookie('mystore', userSignInToken, { path: '/' });

    return res.status(200).json({
      message: 'Signed In!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store, login };