const process = require('process');
const os = require('os');

console.log(process.env);
console.log('==========================================================================');
console.log(os.cpus());
console.log(os.tmpdir());

// sep, delimiter 운영 체제마다의 환경 변수, 경로 구분용