import { apply, infixL } from '../src/main'
/**
 * Examples
 */

const sum = (x: number, y: number) => x + y

const mul = (x: number, y: number) => x * y

const double = (x: number) => x * 2

/**
 * Hello World
 */

const greet = (name: string) => `Hello ${name}!`

apply(greet, 'world!').pipe(console.log) // Hello world!

/**
 * Multiple arguments
 */

const cat = (sep: string, ...strings: string[]) => strings.join(sep) ?? ':('

apply(cat, ' ', 'Yo', 'this', 'is', 'fun', 'xD').pipe(console.log)

/**
 * With rest params!
 */

type Vec2 = [x: number, y: number]
const a: Vec2 = [1, 3]
const b: Vec2 = [2, 4]

const dot = (x1: number, y1: number, x2: number, y2: number) =>
  x1 * x2 + y1 * y2

// 1 * 2 + 3 * 4 = 14
apply(dot, ...a, ...b).pipe(console.log)

/**
 * void params works too
 */

const createNum = () => Math.floor(Math.random() * 10)

// random number * 2 * 2 then console.log
apply(createNum).pipe(double).pipe(double).pipe(console.log)

/**
 * ...and infix-ish chaining
 */

// 3 * 2 * 4 then console.log result
apply(double, 3).infixF(mul).infixR(4).pipe(console.log)

infixL(3).infixF(sum).infixR(39).pipe(console.log)
