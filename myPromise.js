// Promise 基本原理：
// 1.构造函数传入一个执行器，代码立即执行；
// 2.promise只有三种状态，Pending、Fullfilled、Rejectes
// 3.状态只能从Pending-Fullfilled/Rejected，不可二次更改；
// 4.使用resolve和reject方法完成状态变更；
// 5.then方法内部进行状态判断，执行相应的回调函数；
// 6.链式调用需要返回一个新的promise对象，return this不起作用，封死了promise的状态，需要解决的是onFullfilled函数返回一个promise

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    // 立即执行的代码
    try{
      executor(this.resolve, this.reject);
    }
    catch(err) {
      this.reject(err)
    }
  }
  status = PENDING;
  value = null;
  reason = null;
  onFullfilled = [];
  onRejected = [];

  // 箭头函数保证this指向定义域内的上层对象，也就是MyPromise实例对象
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFullfilled.length) {
        this.onFullfilled.shift()(this.value)
      }
    }
  }
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejected.length) {
        this.onRejected.shift()(this.reason);
      }
    }
  }

  then(onFullfilled, onRejected) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    let promise =  new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          let x = onFullfilled(this.value);
          resolvePromise(promise, x, resolve, reject);
        })
      }
      else if (this.status === REJECTED) {
        onRejected(this.reason);
      }
      else {
        this.onFullfilled.push(onFullfilled);
        this.onRejected.push(onRejected);
      }
    })
    return promise;
  }

  catch(callback) {
    this.then(null, callback);
  }

  finally(callback) {
    this.then( res => MyPromise.resolve(callback()).then(() => res), 
              err => MyPromise.resolve(callback()).then(() => {throw err}));
  }

  all (promises) {
    const res = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      let addData = (index, value) => {
        res[index] = value;
        count++;
        if (count === promises.length) {resolve(res)}
      }
      promises.map((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(res => addData(index, res), err => reject(err))
        }
        else {
          addData(index, promise)
        }
      })
    })
  }

  race (promises) {
    return new MyPromise((resolve, reject) => {
      promises.map(promise => {
        if (promise instanceof MyPromise) {
          promise.then(res => resolve(res), err => reject(err))
        }
        else resolve(promise)
      })
    })
  }

  allSettled(promises) {
    let result = [];
    let count = 0;
    return newMyPromise((resolve, reject) => {
      let addData = (str, pro, index) => {
        result[index] = {
          state: str,
          value: pro,
        }
        count++;
        if (count === promises.length) resolve(result);
      }
      promises.map((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(res => addData('fullfilled', res, index), err => addData('error', err, index))
        }
        else addData('fullfilled', promise, index)
      })
    })
  }

  any(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      promises.map(promise => {
        if (promise instanceof MyPromise) {
          promise.then(res => resolve(res), err => {
            count++;
            if (count === promises.length) {reject('All promises were rejected')}
          })
        }
        else resolve(promise)
      })
    })
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (x === promise) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  if (x instanceof MyPromise) x.then(resolve, reject)
  else resolve(x)
}

module.exports = MyPromise;