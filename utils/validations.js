const { body } = require('express-validator');

module.exports = {
    signUpValidation: [
        body('firstName').notEmpty().withMessage('first name is required'),
        body('lastName').notEmpty().withMessage('last name is required'),
        body('email').isEmail().withMessage('email not valid'),
        body('password').isLength({ min: 5 }).withMessage('minimum 5 character rquired'),
    ],
    loginValidation: [
        body('email').notEmpty().withMessage('email is required').bail().isEmail().withMessage('please give valid email'),
        body('password').notEmpty().withMessage('password is required').bail().isLength({ min: 5 }).withMessage('minimum 5 character required'),
    ],
    forgotPasswordValidation: [
        body('email').notEmpty().withMessage('email is required').bail().isEmail().withMessage('please give valid email'),
    ],
    resetPasswordvalidation: [
        body('password').notEmpty().withMessage('password is required').bail().isLength({ min: 5 }).withMessage('minimum 5 character required'),
    ],
    changePasswordValidation: [
        body('oldPassword').notEmpty().withMessage('oldPassword is required'),
        body('newPassword').notEmpty().withMessage('newPassword is required'),
        body('password_confirmation').notEmpty().withMessage('password_confirmation is required'),
    ]

}