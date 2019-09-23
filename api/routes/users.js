const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// 해쉬 암호화를 위한 bcryptjs 할당
const bcrypt = require('bcryptjs');
// 로그인시 토큰 발행을 위한 jsonwebtoken 할당
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const checkAuth = require('../middleware/check-auth');

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
 * @route   GET /users/detail/:userId
 * @desc    Get user detail
 * @access  Public
 */
router.get('/detail/:userId', (req, res) => {
    
    const id = req.params.userId;

    userModel
        .findById(id)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: 'Not found user'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful find user',
                    userInfo: result
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
 * @route   PATCH /users/:userId
 * @desc    Modify user info 
 * @access  Private
 */
router.patch('/:userId', checkAuth, (req, res) => {

    const id = req.params.userId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    userModel
        .update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: 'Can not modify user info'
                });
            } else {
                res.status(200).json({
                    msg: 'Successful modify user info',
                    updateUserInfo: result,
                    request: 'http://localhost:5000/users/detail/' + id
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

    // 기존 이메일이 있는지 체크
    userModel
        .find({ email: req.body.email }) // 기존 이메일에서 찾는다.
        .exec()
        .then(email => {
            // email의 길이가 1과 같거나 크면 기존 이메일이 있는 것.
            if (email.length >= 1) {
                return res.status(409).json({
                    msg: 'please check your email (Email already exists)'
                });
            } else {
                /**
                 * bcrypt 이용 비밀번호 hash 암호화
                 * password 값 첫 번째 아규먼트 암호화 할 값, 두번 째 아규먼트 자리수, 
                 * 3번 째 아규먼트 에러가 있으면 에러 표시, hash가 있으면 hash 표시
                 */
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // 에러 일 때
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        // 유저 등록 속성
                        const user = new userModel({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
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
 * @route   POST /users/login
 * @desc    Sign in user
 * @access  Public
 */
router.post('/login', (req, res) => {
     userModel
        .find({email: req.body.email}) // 사용자 입력 이메일 값 확인
        .exec()
        .then(user => {
            // 가입 된 유저가 없으면
            if (!user) {
                return res.status(404).json({
                    msg: 'Not found user',
                    request: 'http://localhost:5000/users/register'
                });
            } else {
                // 암호화된 비밀번호를 비교하기 위한 compare
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            msg: 'Not match password'
                        });
                    } else if (result) {
                        // 토큰 생성. 생성은 sign으로 한다.
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, "secret", {expiresIn: '1h'}); //expiresIn 1h 1시간, 1m 1분, 1s 1초 (1000/1)이니 1초는 1000
                        
                        return res.status(200).json({
                            msg: 'Successful Auth',
                            token: "Bearer " + token // header에 붙일 때 Bearer를 붙여야 한다.
                        });
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
 * @route   DELETE /users/:userId
 * @desc    Remove user
 * @access  Private
 */
router.delete('/:userId', checkAuth, (req, res) => {
    // 삭제할 유저 아이디
    const id = req.params.userId;

    userModel
        .remove({_id: id})
        .exec()
        .then(result => {
            if (!result) {
                res.status(404).json({
                    msg: 'Not found user'
                });
            } else {
                res.status(200).json({
                    msg: 'Success remove user',
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