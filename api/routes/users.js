const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// 해쉬 암호화를 위한 bcryptjs 할당
const bcrypt = require('bcryptjs');

const userModel = require('../models/user');

/**
 * @route   GET /users/all
 * @desc    Get users list
 * @access  Public
 */
router.get('/all', (req, res) => {
    userModel
        .find()
        .exec()
        .then(results => {
            if (!results) {
                return res.status(404).json({
                    msg: 'Not found user list'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful user list',
                    count: results.length,
                    userList: results
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
 * @route   POST /users/register
 * @desc    Register user
 * @access  Public
 */
router.post('/register', (req, res) => {

    // 유저 등록 속성
    const user = new userModel({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user
        .save()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: 'Failed create user'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful create user',
                    userInfo: result,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/users/all'
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


module.exports = router;
