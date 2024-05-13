const { body } = require('express-validator');

module.exports = {
    signUpValidation: [
        body('firstName').notEmpty().withMessage('first name is required'),
        body('lastName').notEmpty().withMessage('last name is required'),
        body('email').notEmpty().withMessage('email is required').bail().isEmail().withMessage('please give valid email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').bail()
            .isLength({ max: 20 }).withMessage('Password must be at most 20 characters long').bail()
            .matches(/[A-Z]/).withMessage('Password must contain at least one capital letter')
            .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character (!@#$%^&*)')
            .matches(/[0-9]/).withMessage('Password must contain at least one number'),
        body('mobileNumber')
            .isMobilePhone('any', { strictMode: false })
            .withMessage('Invalid mobile number'),
        body('confirmPassword').notEmpty().withMessage('password_confirmation is required')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            }).withMessage('Passwords do not match'),

    ],

    loginValidation: [
        body('email').notEmpty().withMessage('email is required').bail().isEmail().withMessage('please give valid email'),
        body('password').notEmpty().withMessage('password is required'),
    ],
    forgotPasswordValidation: [
        body('email').notEmpty().withMessage('email is required').bail().isEmail().withMessage('please give valid email'),
    ],
    resetPasswordvalidation: [
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').bail()
            .isLength({ max: 20 }).withMessage('Password must be at most 20 characters long').bail()
            .matches(/[A-Z]/).withMessage('Password must contain at least one capital letter')
            .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character (!@#$%^&*)')
            .matches(/[0-9]/).withMessage('Password must contain at least one number'),
        body('confirmPassword').notEmpty().withMessage('password_confirmation is required')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            }).withMessage('Passwords do not match'),
    ],
    changePasswordValidation: [
        body('oldPassword').notEmpty().withMessage('oldPassword is required'),
        body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').bail()
            .isLength({ max: 20 }).withMessage('Password must be at most 20 characters long').bail()
            .matches(/[A-Z]/).withMessage('Password must contain at least one capital letter')
            .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character (!@#$%^&*)')
            .matches(/[0-9]/).withMessage('Password must contain at least one number'),
        body('password_confirmation').notEmpty().withMessage('password_confirmation is required')
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error('confirm Passwords do not match');
                }
                return true;
            }).withMessage('confirm Passwords do not match'),
    ],
    updateProfileValidation: [
        body('firstName').notEmpty().withMessage('first name is required'),
        body('lastName').notEmpty().withMessage('last name is required'),
        body('email').notEmpty().withMessage('email is required').bail().isEmail().withMessage('please give valid email'),
        body('mobileNumber')
            .isMobilePhone('any', { strictMode: false })
            .withMessage('Invalid mobile number'),
    ],
    menuValidation: [
        body('menu_name').notEmpty().withMessage('please give menu name'),
        body('description').notEmpty().withMessage('please give description'),
        body('price').notEmpty().withMessage('please give price'),
        body('category_id').notEmpty().withMessage('please give category_id'),
    ],
    categoryValidation: [
        body('category').notEmpty().withMessage('please give the category name')
    ],

}


