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

module.exports = router;