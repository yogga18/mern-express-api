const { validationResult } = require('express-validator');

const register = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Input Value Tidak Sesuai');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const result = {
    message: 'Register Succes',
    data: {
      uid: 1,
      name: name,
      email: email,
    },
  };

  res.status(201).json(result);
};

module.exports = {
  register,
};
