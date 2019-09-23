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

/**
 * @route   POST /orders
 * @desc    Test Post Router
 * @access  Public
 */
router.post('/', (req, res) => {

    /**
     * 장바구니에 상품을 등록하려면 상품의 아이디 값이 필요하다. 
     * */ 
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };

    res.status(200).json({
        msg: 'Success get router test',
        createOrder: order
    });
});

// 모듈로 한번에 내보냄
module.exports = router;