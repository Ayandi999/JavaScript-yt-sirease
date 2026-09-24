// let a = 10;
// a = "Ayandip";

// console.log(5+3);
// console.log("5"+"3");

//JS is aDynamically typed language
let a = 10;
a = "a"

//JS is a weekly typed language
console.log(5 + "3");
console.log("5" - 2);
//TYPE coersion;
//----------------------------

//Primitive dataypes:
/**
 * Number
 * BigInt
 * String
 * Null
 * Undefined
 * Boolean
 * Symbols
 */

//typeof operator:

console.log(typeof a);
if(typeof a === "string"){
     console.log('Hi')
}
//-------------------------------------------------------
console.log(Number.MAX_SAFE_INTEGER+5)
//--------------------------
//Number:
//IEEE 754 standard 
// console.log(5 === 5.0);

console.log(0.2+0.1 === 0.3);

/**@
 * 0.1 → 0.10000000000000000555...
 * 0.2 → 0.20000000000000001110..
 */

console.log(0.2+0.1);
//------------------------------------------
//NaN -> Not a Number

console.log(typeof NaN);
console.log(10 - "a");

console.log(NaN === NaN);

console.log(Number.isNaN(50));
//------------------------------------------
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

console.log(Number.MAX_SAFE_INTEGER+5 === Number.MAX_SAFE_INTEGER+4)
//------------------------------------
console.log(10/0);
console.log(-10/0);

console.log( 0 )
console.log( -0 );
console.log(0 === -0);
//----------------------------------
//BigInt
let big = 10n;
console.log(typeof big);

console.log(5n/2n);
//---------------------------------
//String
let str1 = "Jonathan"; //-> ""
let str2 = 'Joestar'; //->''
let str3 = `${str1} ${str2}`; //->``
console.log(str3);

//--------------------------------
//Immutable
str1[0]='X';
console.log(str1);
//--------------------------------
//Function:
//1. length

console.log(str3.length);
console.log(str3.toUpperCase());
console.log(str3.toLowerCase());
console.log(str3.indexOf('x'));

console.log(str3[3]);

console.log(str3.slice(0,5));
console.log(str3.replace('Jona','Xce64646r'));
//------------------------------------
//Assignment:
console.log("🤣".length); 
console.log("👨‍👩‍👧‍👦".length); 
//------------------------------------
//Boolean:
console.log(10===10)
console.log(typeof(10!==10));

//truthy and falsy values:
//falsy values:
/**
-> false
-> 0
-> -0
-> 0n (BigInt zero)
-> "" (empty string)
-> null
-> undefined
-> NaN
 */

//truthy values:
// if ([])             
// if ({})             
// if ("false")        
// if ("0")            
// if (-1)             
// if (function () {}){}
//--------------------------------------
//NUll and Undefined:
let uninit;
console.log(uninit);

a=null;
console.log(a);

console.log(typeof undefined);

console.log(typeof null); // Object
//-----------------------------------------
//Symbols:
//-----------------------------------------
//Non primitive datatypes:

//1. They are copied by refference:

// let k = 'ayan';
// let j = k;
// j = 'dip'
// console.log(j,k);

let arr1 = [1,2,3]
let arr2 = arr1;
arr2[0]=10;
console.log(arr2);
console.log(arr1);

const obj = {
     name:'Ayandip',
     sem : '7th'
}
//-------------------------------------