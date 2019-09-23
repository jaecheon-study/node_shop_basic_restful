// 미들웨어는 실행되면 무조건 (중간에) 거쳐가는 곳.
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 인증 관련부분, 토큰 명칭
        const token = req.headers.authorization.split(" ")[1];
         // token 확인, 암구어 같은 secret 앞에 secret으로 설정했으면 여기에서 같은 명으로 해주어야한다.
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            msg: 'Auth failed'
        });
    }
}