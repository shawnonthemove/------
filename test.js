const MyPromise = require('./myPromise')
// const promise = new MyPromise((resolve, reject) => {
//   // setTimeout(() => {
//   //   resolve('success')
//   // }, 2000); 
//   resolve('success')
// })

// function other () {
//   return new MyPromise((resolve, reject) =>{
//     resolve('other')
//   })
// }
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return other()
// }).then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

// const p1 = promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return p1
// })

// // 运行的时候会走reject
// p1.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// }, reason => {
//   console.log(3)
//   console.log(reason.message)
// })

// const p4 = new MyPromise((resolve, reject) => {
//   resolve(100)
// //}).then(res => new Promise((resolve, reject) => resolve(3 * res)), err => console.log(err))
// }).then(res => console.log(1), err => console.log(err))
// console.log(2);

// promise进阶：解决实际问题
// 问题一：接口请求超时
// 定义延时函数和接口请求函数赛跑

// 问题二：转盘抽奖
// 需要首先确定请求在转盘停止前返回，然后和停止转动回调一起执行，race+all

function sleep(wait) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => reject("超时!"), wait)
  })
}
function request(wait) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("请求成功!"), wait)
  })
}
function turntableSleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve('停止转动喽'), delay)
  })
}
// Promise.all([Promise.race([sleep(1500), request(1000)]).then(res => console.log(res), err => console.log(err)), turntableSleep(1500).then(res => console.log(res))])

// 问题三：控制并发的promise调度器
class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
    this.tasks = [];
  }
  add(time, order) {
    let task = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time)
      })
    }
    this.tasks.push(task);
  }
  taskStart() {
    while(this.tasks.length && this.count < this.limit) {
      this.tasks.shift()().then(res => {
        this.count--
        this.taskStart()
      })
      this.count++
    }
  }
}

const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();