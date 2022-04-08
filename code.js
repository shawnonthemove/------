// let input = {
//   a: 'a',
//   b: [1, { c: true }, [3]],
//   d: { e: undefined, f: 3 },
//   g: null,
// };

// // 输出如下
// // {
// //   a: "a",
// //   b[0]: 1,
// //   b[1].c: true,
// //   b[2][0]: 3,
// //   d.f: 3
// //   // null和undefined直接舍去
// // }
// let result = {};
// function reverse(input, str='') {
//   for (let item of Object.keys(input)) {
    
//     if (input[item] === null || input[item] === undefined) {continue;}
//     if (typeof input[item] !== 'object'){
//       let tmp_str = str.length === 0 ? String(item) : str+"["+item+"]";
//       result[tmp_str] = input[item];
//     }
//     else {
//       reverse(input[item], str.length === 0 ? String(item) : str+"["+item+"]");
//     }
//   }
// }
// reverse(input);
// console.log(result);

// 示例一：输入：A3B2，输出：{"A": 3, "B": 2}
// 示例二：输入：A(A(A2B)2)3C2，输出：{"A": 16, "B": 6, "C": 2}

// function stack(input) {
//   let result = {};
//   while(input.indexOf(")") !== -1){
//     let index = input.indexOf(")") - 1;
//     while(input[index] !== '(') {index--};
//     let tmp = '';
//     for (let i = index+1; i < input.indexOf(')'); i++){
//       if (/[A-Z]/.test(input[i])) {
//         tmp += input[i];
//         if (/[0-9]/.test(input[i+1])) tmp += input[i+1] * input[input.indexOf(')')+1];
//         else tmp += input[input.indexOf(')')+1];
//       }
//     }
//     let rep = input.substring(index, input.indexOf(')')+2);
//     input = input.replace(rep, tmp);
//   }
//   for (let i = 0; i < input.length; i++){
//     if (/[A-Z]/.test(input[i])) {
//       if (result[input[i]]) {
//         if(/[0-9]/.test(input[i+1])) {
//           let num = i+1;
//           while(/[0-9]/.test(input[num])) num++;
//           result[input[i]] += +input.substring(i+1, num);
          
//         }
//         else result[input[i]] += 1
//       }
//       else {
//         if(/[0-9]/.test(input[i+1])) {
//           let num = i+1;
//           while(/[0-9]/.test(input[num])) num++;
//           result[input[i]] = +input.substring(i+1, num);
          
//         }
//         else result[input[i]] = 1
//       }
//     }
//   }
//   return result;
// }
// console.log(stack("A(A(A2B)2)3C2"));

