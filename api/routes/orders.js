const express = require('express');
// router 사용 express의 Router() 함수를 가져온다.
const router = express.Router();
// controller에 정의된 order 할당
const orderController = require('../controllers/orders');
// checkAuth 할당
const checkAuth = require('../middleware/check-auth');

/**
 * @route   GET /orders/all
 * @desc    Get order list data
 * @access  Private
 */
router.get('/all', checkAuth, orderController.orders_get_all);

/**
 * @route   GET /orders/detail/:orderId
 * @desc    Get order detail item
 * @access  Private
 */
router.get('/detail/:orderId', checkAuth, orderController.orders_get_detail_orderId);

/**
 * @route   POST /orders/register
 * @desc    Post register order
 * @access  Private
 */
router.post('/register', checkAuth, orderController.orders_post_register);

/**
 * @route   PATCH /orders/:orderId
 * @desc    Modify order item
 * @access  Private
 */
router.patch('/:orderId', checkAuth, orderController.orders_patch_orderId);

/**
 * @route   DELETE /orders/:orderId
 * @desc    Delete order item
 * @access  Private
 */
router.delete('/:orderId', checkAuth, orderController.orders_delete_orderId);

// 모듈로 한번에 내보냄
module.exports = router;