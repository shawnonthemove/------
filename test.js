const MyPromise = require('./myPromise')
const promise = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('success')
  // }, 2000); 
  resolve('success')
})

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

const p4 = new MyPromise((resolve, reject) => {
  resolve(100)
//}).then(res => new Promise((resolve, reject) => resolve(3 * res)), err => console.log(err))
}).then(res => console.log(1), err => console.log(err))
console.log(2);



