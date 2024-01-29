let data = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
// 레거시 API
const url = require('url');
let legarcy = url.parse(data);
console.log(legarcy);

// WHATWG(웹표준) API
const whatwg = new URL(data);
console.log(whatwg);
console.log(whatwg.searchParams);
console.log(whatwg);