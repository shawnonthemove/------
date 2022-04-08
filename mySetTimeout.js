// 使用setInterval实现循环定时存在问题，使用setTimeout实现，类似requestAnimationFrame，setTimeout的回调函数里面再调用fn

function mySetInterval(fn, delay) {
  let timeout = null;
  let interval = () => {
    fn();
    timeout = setTimeout(interval, delay);
  }
  fn();
  timeout = setTimeout(interval, delay);
  return () => clearTimeout(timeout)
}
let cancel = mySetInterval(() => console.log('settimeout'), 1000);
setTimeout(cancel, 10000);
