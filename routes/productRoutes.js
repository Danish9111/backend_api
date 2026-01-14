const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Validation
const validateProduct = [
    body('price').notEmpty().withMessage('Price is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('color').notEmpty().withMessage('Color is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').notEmpty().withMessage('Stock is required')
];

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, success: false });
    }
    next();
};

// Routes - all protected with authMiddleware
router.get('/', authMiddleware, productController.getAllProducts);
router.post('/', authMiddleware, validateProduct, handleValidation, productController.createProduct);
router.put('/:id', authMiddleware, validateProduct, handleValidation, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;