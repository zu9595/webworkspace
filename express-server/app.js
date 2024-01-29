const fs = require('fs'); // require : 모듈 불러오는 함수
const express = require('express');
const app = express();

// 미들웨어. listen전에 진행하는걸 권장
// -- Request Data Process
// application/json
app.use(express.json({ 
    limit : '50mb'
}));

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}));

// Error
app.use(function(err, req, res, next){
    console.log(err);
    res.status(500).json({
        statusCode : res.statusCode,
        errMessage : err.message
    });
});

app.get('/defaultErr', (req, res)=>{
    throw new Error('기본 핸들러 동작');
});

app.get('/customErr', (req, res, next)=>{
    next(new Error('Process Fail! Check Data!'));
});

// static
app.use(express.static('./files'));
app.use('/public', express.static('./files'));

// Data Loding
const jsonFile = fs.readFileSync('./db.json'); // 동기 구문
const jsonData = JSON.parse(jsonFile);

const getData = (target, where) => {
    let data = jsonData[target];
    if (Array.isArray(data)) {
        let list = data;
        for (let obj of list) {
            if (obj.id == where) {
                data = obj;
            }
        }
    }
    return data;
}


app.listen(3002, () => {
    console.log('http://localhost:3002');
})

app.get('/', (req, res) => {
    res.send('Hello, Express.js World');
})
//전체조회
app.get('/posts', (req, res) => {
    let data = getData('posts');
    res.json(data);
});
//단건조회
app.get('/posts/:id', (req, res) => {
    let postId = req.params.id;
    let data = getData('posts', postId);
    res.json(data);
});
//전체조회 - comments
app.get('/com', (req, res) => {
    let data = getData('comments');
    res.json(data);
});
//단건조회 - comments
app.get('/com2/:id', (req, res) => {
    let comId = req.params.id;
    let data = getData('comments', comId);
    res.json(data);
});
//조회 - profile
app.get('/profile', (req, res) => {
    let data = getData('profile');
    res.json(data);
});

// 등록
app.post('/posts', (req, res) => {
    let data = req.body;
    console.log('등록', data);
    res.json(data);
});

// 수정
app.put('/posts/:id', (req, res) => {
    let postId = req.params.id;
    let data = req.body;
    console.log('수정', postId, data);
    res.json({ id: postId, data });
});

// 삭제
app.delete('/posts/:id', (req, res) => {
    let postId = req.params.id;
    console.log('삭제', postId);
    res.sendStatus(203);
});

// 검색을 포함하는 경우 -> queryString
app.get('/search', (req, res)=>{
    let keywards = req.query;
    console.log('검색조건 구성', keywards);
    res.json(keywards);
});

