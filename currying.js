// 实现函数柯里化，也就是参数拼接
// 函数的length属性可以查看有多少个定义参数

function currying(fn, ...arg1) {
  let length = fn.length;
  let arg = [...arg1];
  let res = (...arg2) => {
    arg = [...arg, ...arg2];
    if (arg.length === length) return fn(...arg)
    else return res;
  }
  return res;
}

const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2,3)) // 1 + 2 + 3=6