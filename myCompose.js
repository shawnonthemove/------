// 实现函数组合compose（fn1，fn2，fn3...）
// 使用for循环实现compose存在问题，而reduce没问题
// -----------------------------------------

function myCompose(...fn) {
  if (fn.length === 0) return (num) => num
  return function () {
    let re = arguments[0];
    for (let f of fn){
      re = f(re);
    }
    return re;
  }

  // return fn.reduce((acc, item) => 
  //   (num) => item(acc(num))
  // , (num) => num);
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