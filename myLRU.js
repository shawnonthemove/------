// LRU(最近最少使用)缓存机制，如果缓存容量到限制，则抛弃最久未使用的数据值。
// 使用map实现，只有有操作就将其添加到map头，使用map.keys().next().value读取第一个key值，进行删除。

class LRU {
  constructor(size) {
    this.size = size;
    this.map = new Map();
  }
  get(key) {
    if (this.map.has(key)) {
      let value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }
    else return -1
  }
  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    if (this.map.size === this.size){
      //this.map.delete(this.map.keys().next().value);
      this.map.delete(Array.from(this.map.keys())[0])
    }
    this.map.set(key, value);
  }
}

let instance = new LRU(2);
console.log(instance.put(1, 1))
console.log(instance.put(2, 2))
console.log(instance.get(1))
console.log(instance.put(3, 3))
console.log(instance.get(2))
console.log(instance.put(4, 4))
console.log(instance.get(1))
console.log(instance.get(3))
console.log(instance.get(4))