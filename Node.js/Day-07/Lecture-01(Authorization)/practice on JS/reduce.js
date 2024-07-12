const arr = [25, 5, 82, 5, 1, 20];
let count = 0;
const result = arr.reduce((val1, val2) => {
  count++;
  //   console.log("val1 :: ", val1);
  //   console.log("val2 :: ", val2);
  return val1 * 2 + val2; //It becomes the val1 value
}, 1);

// console.log("Result :: ", result);
// console.log(typeof result);
// console.log("count :: ", count);

/**
 * Summary :- Reduce method has two types of values, they are :-
 *              (1)Variable values :: This is not a typical variable values but instead of this it like he result we want
 *              (2)Array's element :: On which the reduce method is applied
 *
 * Note :: If we don't pass the second argument into the reduce mehtod then the val1 value will be taken by the reduce method from the array. And the return value will become the next initial value, we can call this as a variable value.
 */

//let's apply on an object

const cookieStr =
  "loginToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2YzFiZGRhNTc1NTE0OWE1NTFmMyIsImVtYWlsIjoic29udWt1bWFyQGdtYWlsLmNvbSIsImlhdCI6MTcyMDYwOTgxOX0.Pm9mqqeNpr4LN_CNqESCVXfWaN4diELR7q9ONVe-hd0";

const cookieArr = cookieStr.split();
console.log("cookieArr :: ", cookieArr);

/**
 * cookieArr ::  [
  'loginToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGU2YzFiZGRhNTc1NTE0OWE1NTFmMyIsImVtYWlsIjoic29udWt1bWFyQGdtYWlsLmNvbSIsImlhdCI6MTcyMDYwOTgxOX0.Pm9mqqeNpr4LN_CNqESCVXfWaN4diELR7q9ONVe-hd0;'
]
 */

console.log("cookies list :: ", cookies);
