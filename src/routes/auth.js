//import module
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// call controller
const authController = require('../contollers/auth');

//create methode and function controller
router.post(
  '/register',
  [
    body('name')
      .isLength({ min: 8, max: 50 })
      .withMessage('Minimum name 8 characters and maximum 50'),
    body('password')
      .isLength({ min: 8, max: 20 })
      .withMessage(
        'The minimum password length is 8 characters and the maximum is 20'
      ),
  ],
  authController.register
);

module.exports = router;
