const mongoose = require('mongoose');

/**
 * 스키마 속성은 약자로 하지 않는게 좋다.
 * ex) pwd(x) -> password(o)
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    email: {type: String, require: true},
    password: {type: String, require: true}
});

module.exports = mongoose.model('users', userSchema);