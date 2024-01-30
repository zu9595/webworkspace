const { error } = require('console');
const fs = require('fs'); // 파일 시스템 모듈
const data = 'Hello, Node.js World';

// 파일 쓰기
// fs.writeFile('./sample.txt', data , 'utf-8', (err)=>{
//     if(err) throw err;
//     console.log('job completed');
// })

// 파일 읽기
fs.readFile('./sample.txt', 'utf-8', (err, datas)=>{
    if(err) throw err;
    console.log(datas);
})