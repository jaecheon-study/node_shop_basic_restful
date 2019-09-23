const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');

/**
 * @route   GET /products/all
 * @desc    Get products all data
 * @access  Public
 */
router.get('/all', productController.products_get_all);

/**
 * @route   GET /products/detail/:productId
 * @desc    Get products detail item
 * @access  Public
 */
router.get('/detail/:productId', productController.products_get_detail_productId);

/**
 * @route   POST /products/register
 * @desc    register product item
 * @access  Private
 */
router.post('/register', checkAuth, productController.products_post_register);

/**
 * @route   PATCH /products/:productId
 * @desc    Modify product item
 * @access  Private
 */
router.patch('/:productId', checkAuth, productController.products_patch_productId);

/**
 * @route   DELETE /products/:productId
 * @desc    Delete product item
 * @access  Private
 */
router.delete('/:productId', checkAuth, productController.products_delete_productId);

module.exports = router;