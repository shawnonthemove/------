// 实现深拷贝

function deepClone(obj, map) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (map[obj]) return map[obj];
  let clone = Array.isArray(obj) ? [] : {};
  map[obj] = clone;
  for (let key in obj) {
    clone[key] = deepClone(obj[key], map)
  }
  return clone;
}

const a = {
  name: 'sunshine_lin',
  age: 23,
  hobbies: { sports: '篮球', tv: '雍正王朝' },
  works: ['2020', '2021']
}
a.key = a
const b = deepClone(a, {})

console.log(b)
