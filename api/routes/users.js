const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/users');

/**
 * @route   GET /users/all
 * @desc    Get users list
 * @access  Public
 */
router.get('/all', userController.users_get_all);

/**
 * @route   GET /users/detail/:userId
 * @desc    Get user detail
 * @access  Public
 */
router.get('/detail/:userId', userController.users_get_detail_userId);

/**
 * @route   PATCH /users/:userId
 * @desc    Modify user info 
 * @access  Private
 */
router.patch('/:userId', checkAuth, userController.users_patch_userId);

/**
 * @route   POST /users/register
 * @desc    Register user
 * @access  Public
 */
router.post('/register', userController.users_post_register);

/**
 * @route   POST /users/login
 * @desc    Sign in user
 * @access  Public
 */
router.post('/login', userController.users_post_login);

/**
 * @route   DELETE /users/:userId
 * @desc    Remove user
 * @access  Private
 */
router.delete('/:userId', checkAuth, userController.users_delete_userId);

module.exports = router;