// express를 사용하기 위해 할당
const express = require('express');
// express() 함수를 app에 할당
const app = express();
// morgan 할당
const morgan = require('morgan');
// request data의 body로부터 파라미터를 편리하게 추출하는 모듈
const bodyParser = require('body-parser');
// 기본 서버를 작성하기위한 http
const http = require('http');
// port 설정
const PORT = 5000;
// 서버 생성
const server = http.createServer(app);

// 생성한 라우터 할당
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');

// body-parser 설정
app.use(bodyParser.json()); // json 형태
/**
 * 만약 아무 옵션을 주지 않는다면, body-parser deprecated undefined extended: provide extended option 같은 문구가 뜬다.
 * 문서를 보면, .use(bodyParser.urlencoded({ extended: true or false })); 로 쓰라고 한다. extended 는 중첩된 객체표현을 
 * 허용할지 말지를 정하는 것이다. 객체 안에 객체를 파싱할 수 있게하려면 true.
 */
app.use(bodyParser.urlencoded({extended: false}))

// 라우터 url 경로 설정
app.use('/products', productRoute);
app.use('/orders', orderRoute);

// morgan의 사용 'dev'말고 여러 종류가 있다.
// 콘솔창을 보여줌.
app.use(morgan('dev'));

server.listen(PORT, ()=> console.log(`Server Start... on PORT: ${PORT}`));