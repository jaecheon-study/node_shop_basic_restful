const express = require('express');
// router 사용 express의 Router() 함수를 가져온다.
const router = express.Router();

/**
 * @route   GET /orders
 * @desc    Test Get Router
 * @access  Public
 */
router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Success get router test'
    });
});

// 모듈로 한번에 내보냄
module.exports = router;