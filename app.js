// express를 사용하기 위해 할당
const express = require('express');
// express() 함수를 app에 할당
const app = express();
// 기본 서버를 작성하기위한 http
const http = require('http');
// port 설정
const PORT = 5000;
// 서버 생성
const server = http.createServer(app);

// 생성한 라우터 할당
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');

// 라우터 url 경로 설정
app.use('/products', productRoute);
app.use('/orders', orderRoute);

server.listen(PORT, ()=> console.log(`Server Start... on PORT: ${PORT}`));