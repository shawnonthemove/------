// 重点在于使用this不应该使用箭头函数，其次split是数组方法，substring是字符串方法。
String.prototype._trim = function () {
  let [left, right] = [0, this.length - 1];
  while(left <= right && this[left] === ' ') left++;
  while(left <= right && this[right] === ' ') right--;
  return this.split('').slice(left, right + 1).join('');
}
let str = '   ';
console.log(str._trim().length);