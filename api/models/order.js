const mongoose = require('mongoose');

// order schema 생성
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // 장바구니에 product item의 정보가 필요. id 값으로 가져온다.
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products', // collection products 참조
        require: true // 필수값 체크. true
    },
    quantity: {
        type: Number,
        default: 1 // 값이 없으면 기본으로 1
    }
});

module.exports = mongoose.model('orders', orderSchema);