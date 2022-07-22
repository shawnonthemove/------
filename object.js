// freeze = 不可扩展 + 不可配置 + 不可写 = seal（） + 不可写 = preventExtensions + 不可写 + 不可配置
Object.prototype._objectFreeze = function() {
    let obj = this;
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (obj[k] instanceof Object) obj[k]._objectFreeze()
          else {
            Object.defineProperty(obj, k, {
              writable: false,
              configurable: false,
          });}
        }
    }
    Object.preventExtensions(obj);
}

let obj = {'as': 2};
obj._objectFreeze();
obj.as = 3;
delete obj['as'];
obj['aaa'] = 3;
console.log(obj);