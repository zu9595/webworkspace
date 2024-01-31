const express = require('express');
const app = express();
const mysql = require('./db.js');
// mysql.executeQuery();
// application/json
app.use(express.json());
//app.use(function(req, res, next){});

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


app.listen(3000, () => {
    console.log('Server Start, http://localhost:3000');
});

app.get('/customers', async (req, res) => { // promise는 비동기로 실행돼서 then이나 await로 순번을 정해줘야함
    let list = await mysql.executeQuery('customerList');
    res.json(list);
});

app.get('/customers/:id', async (req, res) => {
    let customerId = req.params.id;
    let info = (await mysql.executeQuery('customerInfo', customerId))[0];
    res.json(info);
});

app.post('/customers', async (req, res) => {
    let data = req.body.param; // 객체
    let result = await mysql.executeQuery('customerInsert', data);
    res.json(result);
})

app.put('/customers/:id', async (req, res) => {
    //let result = await updateAll(req);
    let result = await updateInfo(req);
    res.json(result);
});




async function updateAll(request) {
    let data = [selectedInfo(request.body.param), request.params.id]; //set절, id컬럼
    let result = await mysql.executeQuery('customerUpdateAll', data);
    return result;
}

function selectedInfo(obj) {
    let delData = ["id", "email"];
    let newobj = {};
    // for(let field in obj){
    //         if(field == "id") continue;
    //             newobj[field] = obj[field];
    // }
    let isTargeted = null;
    for (let field in obj) { // field : id, name, email, phone, address
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
    let data = [...getInfo(request.body.param), request.params.id]; // 컬럼 : email, phone, address, id
    let result = await mysql.executeQuery('customerUpdateInfo', data);
    return result;
}

function getInfo(obj) {
    let getData = ["email", "phone", "address"];
    let newAry = [];
    for (let target of getData) {
        for (let field in obj) {
            if (field == target) {
                newAry.push(obj[field]);
                break;
            }
        }
    }
    return newAry; // [ "???@email.com", "010-1234-1234", null]
};