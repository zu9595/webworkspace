const express = require('express');
const app = express();
const mysql = require('./db.js');
// mysql.executeQuery();
// application/json
app.use(express.json());
//app.use(function(req, res, next){});

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


app.listen(3001, () => {
    console.log('Server Start, http://localhost:3001');
});

app.get('/users', async (req, res) => { // promise는 비동기로 실행돼서 then이나 await로 순번을 정해줘야함
    let list = await mysql.executeQuery('userList');
    res.json(list);
});

app.get('/users/:user_no', async (req, res) => {
    let userNo = req.params.user_no;
    let info = (await mysql.executeQuery('userInfo', userNo))[0];
    res.json(info);
});

app.post('/users', async (req, res) => {
    let data = req.body.obj; // 객체
    let result = await mysql.executeQuery('userAdd', data);
    res.json(result);
});

app.put('/users/:user_no', async (req, res) => {
    //let result = await updateAll(req);
    let result = await updateInfo(req);
    res.json(result);
});




async function updateAll(request) {
    let data = [selectedInfo(request.body.obj), request.params.user_no];
    let result = await mysql.executeQuery('userUpdateAll', data);
    return result;
}

function selectedInfo(obj) {
    let delData = ["user_no", "user_gender"];
    let newobj = {};
    let isTargeted = null;
    for (let field in obj) {
        isTargeted = false;
        for (let target of delData) {
            if (field == target) {
                isTargeted = true;
                break;
            }
        }
        if (!isTargeted) {
            newobj[field] = obj[field];
        }//
    }
    return newobj;
};




async function updateInfo(request) {
    let data = [...getInfo(request.body.obj), request.params.user_no];
    let result = await mysql.executeQuery('userUpdateInfo', data);
    return result;
}

function getInfo(obj) {
    let getData = ["user_id", "user_pwd", "user_name"];
    let newAry = [];
    for (let target of getData) {
        for (let field in obj) {
            if (field == target) {
                newAry.push(obj[field]);
                break;
            }
        }
    }
    return newAry;
};