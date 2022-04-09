// 实现函数组合compose（fn1，fn2，fn3...）

function myCompose(...fn) {
  //if (fn.length === 0) return (num) => num
  // let re = (num) => num;
  // for (let item of fn){
  //   re = (num) => item(re(num))
  // }
  // return re;

  return fn.reduce((acc, item) => {
    return (num) => item(acc(num))
  });
}

function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = myCompose(fn1, fn2, fn3, fn4);
console.log(a(1));