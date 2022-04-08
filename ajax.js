// 手写ajax的实现原理，创建xhr，使用open方法和send方法，监视onreadystatechange事件。

const ajax = {
  get(url, fn) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) fn(xhr.responseText)
    }
    xhr.send();
  },
  post(url, data, fn) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    // 设置header信息，默认的将数据编码为字符串形式
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) fn(xhr.responseText)
    }
    xhr.send(data);
  }
}