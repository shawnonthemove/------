// 对象扁平化

const obj = {
  a: {
      b: 1,
      c: 2,
      d: {e: 5}
  },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }
let res = {};
function flatten(obj, str) {
  for (let key in obj) {
    if (typeof obj[key] !== 'object') {
      let tmp = str.length > 0 ? str + `[${key}]` : `${key}`;
      res[tmp] = obj[key];
    }
    else flatten(obj[key], str.length > 0 ? str + `[${key}]` : `${key}`);
  }
}
flatten(obj, '')
console.log(res)