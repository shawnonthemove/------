// 重点在于使用this不应该使用箭头函数，其次split是数组方法，substring是字符串方法。
String.prototype._trim = function () {
  let [left, right] = [0, this.length - 1];
  while(left <= right && this[left] === ' ') left++;
  while(left <= right && this[right] === ' ') right--;
  return this.split('').slice(left, right + 1).join('');
}
// let str = '   ';
// console.log(str._trim().length);

// promise 面试题

var urls = [
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
];
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log(url);
      resolve(url);
    };
    img.onerror = function() {
      reject(new Error('Could not load image at' + url));
    };
    img.src = url;
    let div = document.getElementsByTagName('div')[0];
    div.appendChild(img);
  });
}

function limitedLoad(urls, handler, limit) {
  let promise = urls.splice(0, limit).map((url, index) => handler(url).then(() => index))
  return urls.reduce((acc, cur) => {
    return acc.then(() => {
      return Promise.race(promise);
    }).then(index => {
      promise[index] = handler(cur).then(() => index);
    }).catch(err => console.error(err));
  }, Promise.resolve())
  .then(() => Promise.all(promise));
}
limitedLoad(urls, loadImg, 3).then(res => console.log(res));