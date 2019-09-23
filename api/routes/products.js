const express = require('express');
const router = express.Router();

/**
 * @route   GET /products
 * @desc    Test Get Router
 * @access  Public
 */
router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Success get products test'
    });
});

/**
 * @route   POST /products
 * @desc    Test Post Router
 * @access  Public
 */
router.post('/', (req, res) => {
    res.status(200).json({
        msg: 'Success post products test'
    });
});

/**
 * @route   PATCH /products
 * @desc    Test Patch Router
 * @access  Public
 */
router.patch('/', (req, res) => {
    res.status(200).json({
        msg: 'Success patch products test'
    });
});

/**
 * @route   DELETE /products
 * @desc    Test Delete Router
 * @access  Public
 */
router.delete('/', (req, res) => {
    res.status(200).json({
        msg: 'Success delete products test'
    });
});


module.exports = router;