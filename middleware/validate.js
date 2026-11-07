const { body, param, validationResult } = require('express-validator');

const einStatusValues = ['pending', 'approved', 'not-started'];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
};

const validateObjectId = [
  param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId.'),
  handleValidationErrors
];

const validateBusinessPayload = [
  body('name').trim().notEmpty().withMessage('name is required.').isString().withMessage('name must be a string.'),
  body('ownerName')
    .trim()
    .notEmpty()
    .withMessage('ownerName is required.')
    .isString()
    .withMessage('ownerName must be a string.'),
  body('businessType')
    .trim()
    .notEmpty()
    .withMessage('businessType is required.')
    .isString()
    .withMessage('businessType must be a string.'),
  body('state')
    .trim()
    .notEmpty()
    .withMessage('state is required.')
    .isString()
    .withMessage('state must be a string.')
    .matches(/^[A-Za-z]{2}$/)
    .withMessage('state must be a 2-letter state code.'),
  body('einStatus')
    .trim()
    .notEmpty()
    .withMessage('einStatus is required.')
    .isString()
    .withMessage('einStatus must be a string.')
    .customSanitizer((value) => value.toLowerCase())
    .isIn(einStatusValues)
    .withMessage('einStatus must be one of pending, approved, or not-started.'),
  body('startDate')
    .trim()
    .notEmpty()
    .withMessage('startDate is required.')
    .isString()
    .withMessage('startDate must be a string.')
    .custom((value) => !Number.isNaN(Date.parse(value)))
    .withMessage('startDate must be a valid date.'),
  body('industry')
    .trim()
    .notEmpty()
    .withMessage('industry is required.')
    .isString()
    .withMessage('industry must be a string.'),
  body('notes')
    .optional({ nullable: true, checkFalsy: true })
    .isString()
    .withMessage('notes must be a string when provided.'),
  handleValidationErrors
];

module.exports = {
  validateObjectId,
  validateBusinessPayload
};
