const express = require('express');
const router = express.Router();
const { registerCustomer, registerSeller, loginUser } = require('../controllers/authController');

router.post('/register_customer', registerCustomer);
router.post('/register_seller', registerSeller);
router.post('/login', loginUser);

module.exports = router;
