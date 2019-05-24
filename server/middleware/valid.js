import { check, validationResult } from 'express-validator/check';

const validator = [
  check('firstName').not().isEmpty().withMessage('First name field cannot be empty.'),
  check('lastName').not().isEmpty().withMessage('Last name field cannot be empty.'),
  check('email').not().isEmpty().withMessage('Email field cannot be empty'),
  check('email').isEmail().withMessage('Enter valid email address.'),
  check('address').not().isEmpty().withMessage('Address cannot be empty.'),
  check('password').not().isEmpty().withMessage('Please password is required'),
  check('password').isLength({ min: 6 }).withMessage('Password should be atleast 6 characters'),

];

const applyForLoan = [
  check('amount').not().isEmpty().withMessage('Amount field cannot be empty.'),
  check('tenor').not().isEmpty().withMessage('Kindly input Tenor.'),
  check('tenor').isInt().withMessage('Please input your tenor in digits'),
  // check('tenor').custom((tenor) => {
  //   if (tenor < 1 && tenor > 12) {
  //     throw new Error('Please input digits between 1 and 12');
  //   }
  // }),
];


const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      errors: errors.array().map(error => error.msg)[0],
    });
  }
  next();
};

const valid = {
  validationHandler,
  validator,
  applyForLoan,
};


export default valid;
