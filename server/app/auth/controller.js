const User = require('../user/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/config');

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    
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
      data: {
        ...loginTokenPayload
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

const logout = async (req, res) => {
  try {
    res.clearCookie('mystore');
    return res.status(200).json({
      message: 'Logged out!'
    });
  } catch (error) {
    return res.json({
      message: error.message
    });
  };
};

const currUserInfo = async (req, res) => {
  try {
    const { mystore } = req.cookies;
    if(!mystore) {
      return res.json({
        message: 'Unauthorized.'
      });
    };

    const decodedToken = await jwt.verify(mystore, secretKey);

    const currUser = await User.findById(decodedToken._id).select('-password -createdAt -updatedAt -__v');
    if(!currUser) {
      return res.status(404).json({
        message: 'User not found.',
      });
    };

    return res.status(200).json({
      message: 'Current User info fetched.',
      data: currUser
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { register, login, logout, currUserInfo };