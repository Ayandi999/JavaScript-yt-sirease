# JavaScript Data Types — Complete Study Notes

---

## 1. What are Data Types?

At the physical hardware level, computer memory does not differentiate between text, numbers, or boolean flags. Memory stores raw bits (`0`s and `1`s). The exact same 64 bits of data could represent an integer, a floating-point number, a character in text, or a memory pointer.

A **Data Type** is an abstraction/label that dictates how the JavaScript engine interprets and operates on those bits in memory.

A data type answers two fundamental questions:
1. **Meaning:** What does this value represent?
2. **Operations:** What operations and methods are valid on this value?

### Why Data Types Matter: The Operator Example
The data type dictates the runtime behavior of operations:

```javascript
// Numeric addition
5 + 3;      // Output: 8 (types are numbers)

// String concatenation
"5" + "3";  // Output: "53" (types are strings)
```

> **Key Takeaway:** The operator (`+`) behaves differently not because the symbol changed, but because the underlying operands belong to different data types.

---

## 2. Core Typing Characteristics of JavaScript

### A. Dynamically Typed
In JavaScript, types are associated with **values**, not variable bindings. Variables are simply containers that hold values. Therefore, a variable can change its data type dynamically during program execution:

```javascript
let data = 10;        // 'data' holds a Number
data = "Hello";       // 'data' now holds a String
data = true;          // 'data' now holds a Boolean
data = null;          // 'data' now holds Null
```

### B. Weakly Typed (Implicit Type Coercion)
JavaScript does not strictly enforce type boundaries at compile time or runtime. When an operation receives an unexpected type, JavaScript does not throw an immediate type error; instead, it attempts to silently convert (**coerce**) the value into a compatible type:

```javascript
5 + "3";   // "53" (Number 5 is coerced into String "5", resulting in concatenation)
"5" - 3;   // 2    (String "5" is coerced into Number 5, resulting in arithmetic subtraction)
true + 1;  // 2    (Boolean true is coerced into Number 1)
```

> [!NOTE]
> This automatic behind-the-scenes conversion is known as **Type Coercion**. While convenient, unchecked coercion is a common source of bugs.

---

## 3. Overview: Primitive vs. Non-Primitive Types

JavaScript values are divided into two main categories:

```
                            JavaScript Data Types
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
   Primitive Data Types                              Non-Primitive Data Types
 (Immutable, Copied by Value)                      (Mutable, Copied by Reference)
           │                                                   │
   ├── Number                                          ├── Object ({})
   ├── BigInt                                          ├── Array ([])
   ├── String                                          ├── Function
   ├── Boolean                                         ├── Date, RegExp, Map, Set...
   ├── Undefined
   ├── Null
   └── Symbol (ES6)
```

| Category | Definition | Mutability | Storage / Copy Mechanism |
| :--- | :--- | :--- | :--- |
| **Primitive** | Atomic values representing a single piece of data. | **Immutable** (value cannot be changed in-place). | Stored and copied **by value**. |
| **Non-Primitive** | Complex collections of properties and methods. | **Mutable** (contents can be modified). | Stored and copied **by reference**. |

---

## 4. The `typeof` Operator

The `typeof` operator is an operator used to inspect the data type of an operand.

```javascript
let score = 95;
console.log(typeof score); // "number"
```

> [!IMPORTANT]
> `typeof` **always returns a string**. When performing type checks, always compare against lowercase string names:
>
> ```javascript
> if (typeof score === "number") {
>   console.log("Score is a valid number.");
> }
> ```

---

## 5. Deep Dive: Primitive Data Types

---

### 1. `Number`

Unlike many programming languages (such as C, C++, or Java) that offer separate types like `int`, `long`, `float`, and `double`, JavaScript has only **one** unified standard number type.

Every standard number in JavaScript is stored as a **double-precision 64-bit floating-point** format, conforming to the **IEEE 754 standard**.

Because of this:
```javascript
console.log(5 === 5.0); // true (Both are identical floating-point representations)
```

#### Quirk A: Floating-Point Precision (`0.1 + 0.2 !== 0.3`)
In computer hardware, numbers are stored in base-2 (binary). Fractions like `0.1` and `0.2` cannot be represented precisely in binary with a finite number of bits—they become infinitely repeating binary fractions.

```javascript
console.log(0.1 + 0.2);          // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);  // false
```

**How to handle floating-point comparisons:**
Never compare floats using direct strict equality (`===`). Instead, check if the difference is smaller than an acceptable threshold (tolerance/epsilon):

```javascript
const result = 0.1 + 0.2;
const expected = 0.3;

// Using Number.EPSILON (or a small tolerance like 0.0001)
const isCloseEnough = Math.abs(result - expected) < Number.EPSILON;
console.log(isCloseEnough); // true
```

---

#### Quirk B: `NaN` (Not a Number)

`NaN` represents a computational error that occurs when a mathematical operation fails to produce a meaningful numeric value.

```javascript
console.log(10 - "apple"); // NaN
console.log(typeof NaN);   // "number"
```

> **Why is `typeof NaN` "number"?**  
> `NaN` represents a failed numeric operation. Since the result of a numeric calculation must belong to the numeric type, `NaN` is categorized as a `number`.

**Key Properties of `NaN`:**
- `NaN` is the **only value in JavaScript that is not equal to itself**:
  ```javascript
  console.log(NaN === NaN); // false
  ```
- **Checking for `NaN`:**
  ```javascript
  // Old global function (Flawed due to coercion):
  isNaN("Hello");         // true (coerces "Hello" to NaN first, misleading!)

  // Recommended ES6 method (Strict check without coercion):
  Number.isNaN("Hello");  // false (strictly checks if the value is literally NaN)
  Number.isNaN(NaN);      // true
  ```

> [!TIP]
> **Best Practice:** Always use `Number.isNaN()` rather than the legacy global `isNaN()`.

---

#### Quirk C: Integer Precision Limits

In an IEEE 754 64-bit float, **53 bits** are allocated for the mantissa (integer precision). This sets the safe boundary for exact integer representation:

- **Maximum Safe Integer:** `Number.MAX_SAFE_INTEGER` = $2^{53} - 1$ = `9,007,199,254,740,991`
- **Minimum Safe Integer:** `Number.MIN_SAFE_INTEGER` = $-(2^{53} - 1)$ = `-9,007,199,254,740,991`

Beyond these bounds, JavaScript loses precision and rounds to the nearest representable floating-point number:

```javascript
console.log(9007199254740992 === 9007199254740993); // true (Precision loss!)
```

---

#### Quirk D: Special Numeric Values (`Infinity`, `-Infinity`, `-0`)

- **Division by zero** does not throw a crash or error; it yields infinity:
  ```javascript
  console.log(10 / 0);   // Infinity
  console.log(-10 / 0);  // -Infinity
  console.log(typeof Infinity); // "number"
  ```
- **Negative Zero (`-0`):**
  ```javascript
  console.log(-0 === 0); // true
  ```

---

### 2. `BigInt`

Introduced in **ES2020**, `BigInt` allows JavaScript to represent integers of arbitrary length with absolute precision, removing the $2^{53} - 1$ limitation.

#### Syntax & Creation:
Append an `n` suffix to any integer, or use the `BigInt()` constructor:

```javascript
const largeNumber = 9007199254740992n;
console.log(typeof largeNumber); // "bigint"

// Eliminates the precision overflow bug:
console.log(9007199254740992n === 9007199254740993n); // false
```

#### BigInt Division Quirk:
Because `BigInt` handles only integers, division drops decimal fractions (truncates towards zero):

```javascript
console.log(5n / 2n); // 2n (not 2.5n)
```

> [!WARNING]
> You cannot mix `BigInt` and standard `Number` operands in mathematical operations directly (e.g., `10n + 5` throws a `TypeError`). Explicit conversion is required.

---

### 3. `String`

Strings are sequences of characters used to store textual data.

#### String Literals:
```javascript
let single = 'Single Quotes';
let double = "Double Quotes";
let template = `Template literal: ${single}`; // Supports interpolation & multiline
```

#### Immutability of Strings:
Strings in JavaScript are **immutable**. Once created, individual characters cannot be mutated in place:

```javascript
let word = "hello";
word[0] = "H";
console.log(word); // "hello" (Unchanged)
```

To alter a string, you must derive a new string:
```javascript
word = "H" + word.slice(1); // "Hello"
```

#### Essential String Methods & Properties:

| Method / Property | Description | Example |
| :--- | :--- | :--- |
| `.length` | Returns the number of UTF-16 code units (property, no `()`). | `"Code".length` $\rightarrow$ `4` |
| `.indexOf(str)` | Returns index of first occurrence; `-1` if absent. | `"Dev".indexOf("v")` $\rightarrow$ `2` |
| `.slice(start, end)` | Extracts a section between `start` (inclusive) and `end` (exclusive). | `"Frontend".slice(0, 5)` $\rightarrow$ `"Front"` |
| `.replace(old, new)` | Replaces the first matching substring with a new substring. | `"JS Fun".replace("Fun", "Awesome")` |
| `.toUpperCase()` | Converts string to uppercase. | `"dev".toUpperCase()` $\rightarrow$ `"DEV"` |
| `.toLowerCase()` | Converts string to lowercase. | `"DEV".toLowerCase()` $\rightarrow$ `"dev"` |

#### Quirk: Unicode, Emojis, and `.length`
JavaScript strings use **UTF-16 code units**. Characters with code points exceeding `0xFFFF` (such as emojis or rare historical scripts) require two 16-bit code units, known as a **surrogate pair**:

```javascript
console.log("🤣".length);       // 2 (1 visible emoji = 1 surrogate pair = 2 code units)
console.log("👨‍👩‍👧‍👦".length); // 11
```

> **Why is `"👨‍👩‍👧‍👦".length === 11`?**  
> The family emoji is a composite glyph combining 4 individual people emojis joined together by invisible **Zero-Width Joiner (ZWJ)** characters.

---

### 4. `Boolean`

Booleans represent logical truth values and can have only one of two states: `true` or `false`.

#### Truthy vs. Falsy Values:
When evaluated in a boolean context (such as an `if` statement or ternary operation), every value in JavaScript evaluates to either truthy or falsy.

#### The 8 Falsy Values in JavaScript:
Any value that is not on this list is automatically **truthy**:

1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt zero)
5. `""` (empty string)
6. `null`
7. `undefined`
8. `NaN`

#### Truthy Examples That Catch Beginners Off Guard:
```javascript
if ([])      { /* Executes: Empty arrays are objects, hence truthy */ }
if ({})      { /* Executes: Empty objects are truthy */ }
if ("false") { /* Executes: Any non-empty string is truthy */ }
if ("0")     { /* Executes: Non-empty string */ }
if (-1)      { /* Executes: Any non-zero number is truthy */ }
```

---

### 5 & 6. `null` vs. `undefined`

While both represent the absence of a value, they serve distinct semantic purposes:

| Feature | `undefined` | `null` |
| :--- | :--- | :--- |
| **Meaning** | Declared, but uninitialized (no value has been assigned yet). | Intentional assignment of "no value" or "empty". |
| **Default Context** | Default value of uninitialized variables or functions with no `return`. | Must be explicitly assigned by the developer. |
| **`typeof` Output** | `"undefined"` | `"object"` *(Historical JS Bug)* |

#### The Famous `typeof null` Bug:
```javascript
console.log(typeof null); // "object"
```

> [!WARNING]
> In the first implementation of JavaScript (1995), values were represented with a type tag. Object references had the type tag `0`. `null` was represented as a NULL pointer (`0x00`), causing `typeof` to mistakenly read it as an object. This bug has been intentionally preserved for backwards compatibility with legacy web applications.

#### Comparison: Loose vs. Strict Equality
```javascript
console.log(null === undefined); // false (Different types)
console.log(null == undefined);  // true  (Coerced to equality under loose comparison)
```

---

### 7. `Symbol`

Introduced in **ES6**, `Symbol` produces a completely unique, immutable primitive value. Even if two symbols are created with the exact same description, they are guaranteed to be unique:

```javascript
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false
console.log(typeof id1);   // "symbol"
```

*Primary Use Case:* Creating non-colliding, private-like object property keys.

---

## 6. Non-Primitive Data Types: Objects

Any data type that is not a primitive is an **Object**. This encompasses:
- Plain Objects (`{}`)
- Arrays (`[]`)
- Functions (`function() {}`)
- Built-ins (`Date`, `RegExp`, `Map`, `Set`, etc.)

---

### Copy by Value vs. Copy by Reference

Understanding how primitives and objects are handled in memory is one of the most critical concepts in JavaScript.

#### 1. Primitives: Copied by Value
When assigning or copying primitive variables, the JavaScript engine creates a brand new, independent duplicate of the value in memory:

```javascript
let x = 10;
let y = x; // y receives an independent copy of value 10

y = 20;    // mutating y has zero impact on x

console.log(x); // 10
console.log(y); // 20
```

```
Stack Memory:
x: [ 10 ]
y: [ 20 ]  <-- Independent cell
```

---

#### 2. Objects: Copied by Reference
Variables assigned to objects do **not** store the object data itself directly in their memory slot. Instead, they store a **reference (pointer to the memory address)** in the heap where the object lives:

```javascript
let user1 = { name: "Ayandip" };
let user2 = user1; // user2 receives a copy of the REFERENCE, not the object

user2.name = "John"; // Modifies the object in heap memory

console.log(user1.name); // "John"
console.log(user2.name); // "John"
```

```
Stack Memory              Heap Memory
user1: [ 0xAA01 ] ───┐
                     ├───> [ 0xAA01: { name: "John" } ]
user2: [ 0xAA01 ] ───┘
```

> [!CAUTION]
> **Real-World Impact:** Unintended mutations caused by passing objects or arrays by reference are a frequent source of bugs in frontend state management (e.g., React component re-renders failing because state was mutated in-place).

---

### Reference Equality: Comparing Objects

When using equality operators (`===` or `==`) on non-primitive objects, JavaScript compares **memory references**, not structural content:

```javascript
// Two distinct objects in memory are NEVER equal:
console.log({} === {});                 // false
console.log([] === []);                 // false
console.log([1, 2, 3] === [1, 2, 3]);   // false

// Only equal if both variables point to the exact same memory address:
const arr1 = [1, 2, 3];
const arr2 = arr1; // Both reference the same array

console.log(arr1 === arr2); // true
```

---

## 7. Quick Revision Summary Sheet

| Data Type | Category | `typeof` Result | Key Characteristic / Common Gotcha |
| :--- | :--- | :--- | :--- |
| **Number** | Primitive | `"number"` | 64-bit IEEE 754 float. `0.1 + 0.2 !== 0.3`. Check `NaN` with `Number.isNaN()`. |
| **BigInt** | Primitive | `"bigint"` | Arbitrary precision integer. Suffix with `n` (`100n`). Division truncates decimals. |
| **String** | Primitive | `"string"` | Immutable. UTF-16 code units (emojis take 2 code units). |
| **Boolean** | Primitive | `"boolean"` | `true` or `false`. 8 falsy values in JS; everything else is truthy. |
| **Undefined**| Primitive | `"undefined"` | Variable declared but not assigned. |
| **Null** | Primitive | `"object"` | Deliberate empty value. `typeof null === "object"` is a legacy bug. |
| **Symbol** | Primitive | `"symbol"` | Guaranteed unique and immutable identifier. |
| **Object** | Non-Primitive | `"object"` / `"function"` | Stored and copied **by reference**. Distinct objects are never equal by `===`. |
