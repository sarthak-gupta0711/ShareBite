const User = require('../models/User');
const { generatePasswordHash, checkPasswordHash } = require('../utils/hash');

// @desc    Register a new customer
// @route   POST /api/auth/register_customer
const registerCustomer = async (req, res) => {
  const { name, email, password, confirm_password, phone, address } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const userExists = await User.findOne({ email_address: email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = generatePasswordHash(password);

    const user = await User.create({
      name,
      email_address: email,
      password: hashedPassword,
      phone,
      shipping_address: address,
      user_type: 'consumer'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email_address: user.email_address,
        user_type: user.user_type,
        message: 'Registration successful'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new seller
// @route   POST /api/auth/register_seller
const registerSeller = async (req, res) => {
  const { name, email, password, confirm_password, phone, shipping_address, selling_address } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const userExists = await User.findOne({ email_address: email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = generatePasswordHash(password);

    const user = await User.create({
      name,
      email_address: email,
      password: hashedPassword,
      phone,
      shipping_address,
      selling_address,
      user_type: 'seller'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email_address: user.email_address,
        user_type: user.user_type,
        message: 'Registration successful'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email_address: email, user_type: role });

    if (user && checkPasswordHash(user.password, password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email_address: user.email_address,
        user_type: user.user_type,
        message: 'Login successful'
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerCustomer,
  registerSeller,
  loginUser
};
