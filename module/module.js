import cal from '../module/calculator.js';
// const cal = require('./calculator.js');
const {defNum, add} = require('./calculator.js');

console.log(defNum, add(1,2));
console.log(cal.defNum, cal.add(1,2));