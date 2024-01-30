const express = require('express');
const sessiont = require('express-session');
const cors = require('cors');
const app = express();

// application/x-www-form-urlencoded
const defaultParser = express.urlencoded({ extended: false });

// application/json
const jsonParser = express.json();

// app.use(defaultParser);
app.use(jsonParser);

app.get('/search', defaultParser, (req, res) => {
    let data = req.query.keyword;
    res.send(data + ', 검색결과');
})

app.post('/info', defaultParser, (req, res) => {
    let data = req.body.name;
    res.send('welcome, ' + data);
})
// /info => method: post, body: name=${value}

app.post('/message', (req, res) => {
    let data = req.body.param;
    res.send(data.title + ', ' + data.content);
});
// /message => method : post, body : {"param": {"title" : __, "content": __}}

app.listen(5000, () => {
    console.log('Server Start');
});

let sessionSetting = session({
    secret: 'Have$A!@Nice_day', // 하드코딩 X
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60000 // 밀리세컨드
    }
});

app.use(sessionSetting);

app.post('/login', (req, res) => {
    const { id, pwd } = req.body;
    if (!req.session.isLogin) {
        req.session.user = id;
        req.session.isLogin = true;
    }
    req.session.save((err)=>{
        if(err) throw err;
        res.redirect('/');
    })
});

app.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/');
});

const corsOptions = { // 레거시 브라우저를 위한 설정
    origin : 'http://127.0.0.1:5500',
    optionsSuccessStatus : 200
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json(req.session);
});