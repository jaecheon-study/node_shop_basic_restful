const mongoose = require('mongoose');

/**
 * 스키마 속성은 약자로 하지 않는게 좋다.
 * ex) pwd(x) -> password(o)
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    email: {
        type: String, 
        require: true,
        unique: true, // 유니크한 값. 하나만 존재하게. 기존 이메일 체크 유무
        // 이메일 형식 정규식.
        match:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {type: String, require: true}
});

module.exports = mongoose.model('users', userSchema);