const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const validators = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage('Identifier is required.')
    .isLength({ max: 80 })
    .withMessage('Identifier must be 80 characters or fewer.'),
  body('reference')
    .trim()
    .notEmpty()
    .withMessage('Reference is required.')
    .isLength({ max: 200 })
    .withMessage('Reference must be 200 characters or fewer.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail()
];

router.post('/', validators, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors: errors.array().map(({ msg, param }) => ({ param, msg }))
    });
  }

  const { identifier, reference, email } = req.body;
  console.info('Received forgot-password request', {
    identifier,
    reference,
    email,
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    message: 'Password reset request received. Please check your email for the next steps.'
  });
});

module.exports = router;
