const mongoose = require('mongoose');
// 생성한 모듈 불러옴
const productModel = require('../models/product');

exports.products_get_all = (req, res) => {
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
};

exports.products_get_detail_productId = (req, res) => {
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
};

exports.products_post_register = (req, res) => {
    // product model에서 생성한 collection
    const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
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
};

exports.products_patch_productId = (req, res) => {
    // 변경할 product id
    const id = req.params.productId;
    // product의 어떤 속성 값을 변경할지 모르니 빈 객체하나 생성
    const updateOps = {};
    // 입력 된 req.body의 내용 할당
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    // product model에서 찾음
    productModel
        .update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: 'Not modify product item'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful modify product item',
                    productInfo: result,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/detail/" + id
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.products_delete_productId = (req, res) => {
    // 삭제할 productId
    const id = req.params.productId;

    // product model에서 가져옴
    productModel
        .remove({_id: id})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: 'Not Found product id'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful remove product item'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};