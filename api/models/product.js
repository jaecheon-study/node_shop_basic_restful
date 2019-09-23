const mongoose = require('mongoose');
// product Schema 생성
const productSchema = mongoose.Schema({
    // collection 리스트 (key, type)
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

/**
 * 모듈 내보냄
 * mongoose.model('schema_name', schema) 첫 번째 아규먼트는 스키마의 네임. 두 번째 아규먼트는 생성된 스키마
 * 단수로 이름을 지어도 복수로 자동 변환 된다.  
 * ex) product -> products
 */
module.exports = mongoose.model('Products', productSchema);