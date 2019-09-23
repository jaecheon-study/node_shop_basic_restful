const express = require('express');
// router 사용 express의 Router() 함수를 가져온다.
const router = express.Router();
const mongoose = require('mongoose');
// product의 id를 가져와야 하니 productModel 선언
const productModel = require('../models/product');
// ordersModel 선언
const orderModel = require('../models/order');
// checkAuth 할당
const checkAuth = require('../middleware/check-auth');

/**
 * @route   GET /orders/all
 * @desc    Get order list data
 * @access  Private
 */
router.get('/all', checkAuth, (req, res) => {
    orderModel
        .find()
        .exec()
        .then(results => {
            if (!results) {
                return res.status(404).json({
                    msg: 'Not found order list'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful orders list data',
                    count: results.length,
                    orderList: results
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/**
 * @route   GET /orders/detail/:orderId
 * @desc    Get order detail item
 * @access  Private
 */
router.get('/detail/:orderId', checkAuth, (req, res) => {

    const id = req.params.orderId;

    orderModel
        .findById(id)
        .exec()
        .then(result => {
            // 장바구니가 없을 시
            if (!result) {
                return res.status(404).json({
                    msg: 'Not found order item'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful order item',
                    orderInfo: result
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/**
 * @route   POST /orders/register
 * @desc    Post register order
 * @access  Private
 */
router.post('/register', checkAuth, (req, res) => {

    // product id 할당
    const productId = req.body.productId;

    // 장바구니에 상품을 등록하려면 상품의 아이디 값이 필요하다. product에서 id 값을 찾는다.
    productModel
        .findById(productId) // 아이디로 찾기
        .exec() // 쿼리 실행
        .then(product => { // 쿼리 실행 후 할 일
            // 제품 id가 없는 경우
            if (!product) {
                return res.status(404).json({
                    msg: 'Not found product item'
                });
            } else {
                /**
                 * 제품 id가 있을 경우 data base에 저장 
                 * 장바구니에 상품을 등록하려면 상품의 아이디 값이 필요하다. 
                 */
                const order = new orderModel({
                    _id: new mongoose.Types.ObjectId(),
                    productId: req.body.productId,
                    quantity: req.body.quantity
                });
                return order.save();
            }
        }) 
        .then(result => { // 제품 id가 있을 경우 실행
            res.status(200).json({
                msg: 'Order store',
                createOrder: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/**
 * @route   PATCH /orders/:orderId
 * @desc    Modify order item
 * @access  Private
 */
router.patch('/:orderId', checkAuth, (req, res) => {

    const id = req.params.orderId;

    const quantity = req.body.quantity;

    // const updateOps = {};

    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }

    // 단일 속성 변경
    orderModel 
        .updateOne({_id: id}, {$set: {quantity: quantity}})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: 'Can not modify order item'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful modify order item',
                    orderInfo: result,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/orders/detail/' + id
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/**
 * @route   DELETE /orders/:orderId
 * @desc    Delete order item
 * @access  Private
 */
router.delete('/:orderId', checkAuth, (req, res) => {

    const id = req.params.orderId;

    orderModel
        .remove({_id: id})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: 'Not found order id'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful remove order id',
                    request: {
                        type: 'GET',
                        url: "http://localhost:5000/orders/all"
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// 모듈로 한번에 내보냄
module.exports = router;