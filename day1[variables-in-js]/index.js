//Hoisting

// a = 10;
// console.log(a);
// var a;

// function add(a, b) {
//   var sum = a + b;
//   return sum;
// }

// console.log(sum);
// if (a === 10) {
//   var mul = 7 * a;
// }
// console.log(mul);

//var is function scoped
// let a = 10
// console.log(a);
// a = 'a'
// console.log(a);

//Hoisting

// 

//scoping
// function add(a,b){
//      let sum = a+b;
// }
// console.log(sum);

// if(true){
//      let mul=7*20;
// }
// for(let i=0;i<10;i++) {let a=20; console.log(a);
// }

// console.log(a);
//==================================================

//const
// const a = 10;
// console.log(a);

// const name = 'haaland';
// name = 'messi';
// console.log(name);

const lst = [1,2,3];
lst.push(10)
console.log(lst);

// lst = [11,1,2];


const obj = {
     'name' : 'ayandip'
}

obj['position']='goal keeper'

console.log(obj);
//----------------------------------------------------------

/**@abstract
 * var -> Never Use
 * let -> Use when u need a variable to store a value which changes a lot throughout the code
 * const -> Highly recommended to use this all the time if possible 
 */


