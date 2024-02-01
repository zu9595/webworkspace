
//db 쿼리문
let userList =
`select user_no,
        user_id,
        user_pwd,
        user_name,
        user_gender,
        user_age,
        join_date
from t_users`;

let userInfo =
`select user_no,
        user_id,
        user_pwd,
        user_name,
        user_gender,
        user_age,
        join_date
from t_users
where user_no = ?`;

let userAdd =
`insert into t_users
set ?`;

let userUpdateAll =
`update t_users
set ?
where user_no = ?`;

let userUpdateInfo =
`update t_users
set user_id = ?, user_pwd = ?, user_name = ?
where user_no = ?`;
// 1) 배열인지 아닌지 : 물음표 갯수
// 2) ?별로 객체타입인지 아닌지 : 어느 컬럼에 들어가는 값인지 구분 가능여부

module.exports = {
    userList,
    userInfo,
    userAdd,
    userUpdateAll,
    userUpdateInfo
}

