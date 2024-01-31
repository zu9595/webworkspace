//customerSql.js
//db 쿼리문

let customerList =
`select id,
        name,
        email,
        phone,
        address
from customers`;

let customerInfo =
`select id,
        name,
        email,
        phone,
        address
from customers
where id = ?`;

let customerInsert =
`insert into customers
set ?`; // 객체, 필드명 == 컬럼명\

let customerUpdateAll =
`update customers
set ?
where id = ?`; // 배열[ 객체, 단일값 ]

let customerUpdateInfo =
`update customers
set email = ?, phone = ?, address = ?
where id = ?`; // 배열[ 단일값, 단일값, 단일값, 단일값 ]

// 1) 배열인지 아닌지 : 물음표 갯수
// 2) ?별로 객체타입인지 아닌지 : 어느 컬럼에 들어가는 값인지 구분 가능여부

module.exports = {
    customerList,
    customerInfo,
    customerInsert,
    customerUpdateAll,
    customerUpdateInfo
}

