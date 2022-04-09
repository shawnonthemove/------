// 发布订阅模式
// on：注册，off：取消注册，emit：发布，once：发布一次

class EventEmitter {
  constructor () {
    this.map = {};
  }

  on (event, fn) {
    if (this.map[event] && this.map[event].length > 0) this.map[event].push(fn);
    else this.map[event] = [fn];
  }

  off (event, fn) {
    if (this.map[event] && this.map[event].length > 0) {
      this.map[event] = this.map[event].filter(f => f !== fn)
    }
    console.log(this.map)
  }

  emit (event, ...arg) {
    if (this.map[event] && this.map[event].length > 0){
      // 防止回调函数继续on方法，导致一直循环下去
      let tasks = this.map[event].slice();
      for (let f of tasks) {
        f(...arg)
      }
    }
  }
  once (event, fn) {
    let cb = (...arg) => {
      fn(...arg);
      this.off(event, cb);
    }
    this.on(event, cb);
  }
}

const emitter = new EventEmitter();
emitter.on('drink', (person) => {
	console.log(person + '喝水')
})
let eat = (person) => {
	console.log(person + '吃东西')
}
emitter.on('eat', eat)
emitter.once('buy', (person) => {
	console.log(person + '买东西')
})
emitter.emit('drink', '我') // 我喝水
emitter.emit('drink', '我') // 我喝水
emitter.emit('eat', '其它人') // 其它人吃东西
emitter.emit('eat', '其它人') // 其它人吃东西
emitter.emit('buy', '其它人') //其它人买东西
emitter.emit('buy', '其它人') //这里不会再次触发buy事件，因为once只能触发一次
emitter.off('eat', eat) //移除eat事件
emitter.emit('eat', '其它人') //这里不会触发eat事件，因为已经移除了