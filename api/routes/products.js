const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
// 생성한 모듈 불러옴
const productModel = require('../model/product');

/**
 * @route   GET /products/all
 * @desc    Get products all data
 * @access  Public
 */
router.get('/all', (req, res) => {

    // productModel에서 찾음
    productModel
        .find() // 전체 찾음
        .exec() // 쿼리 진행
        .then(results => {
            res.status(200).json({
                msg: 'Successful products all data',
                count: results.length,
                productList: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

/**
 * @route   GET /products/detail/:productId
 * @desc    Get products detail item
 * @access  Public
 */
router.get('/detail/:productId', (req, res) => {
    
    // 보여줄 상세 정보의 아이디 (product의 id 값)
    const id = req.params.productId; 

    // productModel에서 찾음
    productModel
        .findById(id) // id 값으로 찾음
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: 'Not Found product id'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful detail product item',
                    productInfo: result
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
 * @route   POST /products/register
 * @desc    register product item
 * @access  Public
 */
router.post('/register', (req, res) => {

    // product model에서 생성한 collection
    const product = new productModel({
        name: req.body.name,
        price: req.body.price
    });

    product
        .save() // 저장
        .then(result => {
            res.status(200).json({
                msg: 'Successful register product data',
                createProduct: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
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