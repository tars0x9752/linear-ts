import { expect, test, describe } from 'vitest'

import { apply, infixL } from '../src/main'

describe('apply', () => {
  test('Function application', () => {
    const greet = (name: string) => `Hello ${name}`

    const res = apply(greet, 'world').res

    expect(res).toBe('Hello world')
  })

  test('Various arguments', () => {
    const f = (a: string, b: number, c: number) => `${a}${b * c}`

    const res = apply(f, '2*3=', 2, 3).res

    expect(res).toBe('2*3=6')
  })

  test('With rest params', () => {
    type Vec2 = [x: number, y: number]
    const a: Vec2 = [1, 3]
    const b: Vec2 = [2, 4]

    const dot = (x1: number, y1: number, x2: number, y2: number) =>
      x1 * x2 + y1 * y2

    const res = apply(dot, ...a, ...b).res

    expect(res).toBe(14)
  })

  test('Rest params', () => {
    type Vec2 = [x: number, y: number]
    const a: Vec2 = [1, 3]
    const b: Vec2 = [2, 4]

    const dot = (x1: number, y1: number, x2: number, y2: number) =>
      x1 * x2 + y1 * y2

    const res = apply(dot, ...a, ...b).res

    expect(res).toBe(14)
  })

  test('Void param', () => {
    const createNum = () => 42

    const res = apply(createNum).res

    expect(res).toBe(42)
  })

  test('pipe * 1', () => {
    const createNum = () => 3

    const double = (x: number) => x * 2

    const res = apply(createNum).pipe(double).res

    expect(res).toBe(6)
  })

  test('pipe * 2', () => {
    const createNum = () => 3

    const double = (x: number) => x * 2

    const res = apply(createNum).pipe(double).pipe(double).res

    expect(res).toBe(12)
  })

  test('pipe * 3', () => {
    const createNum = () => 3

    const double = (x: number) => x * 2

    const res = apply(createNum).pipe(double).pipe(double).pipe(double).res

    expect(res).toBe(24)
  })

  test('pipe * 4', () => {
    const createNum = () => 3

    const double = (x: number) => x * 2

    const res = apply(createNum)
      .pipe(double)
      .pipe(double)
      .pipe(double)
      .pipe(double).res

    expect(res).toBe(48)
  })

  test('infix * 1', () => {
    const createNum = () => 3

    const sum = (x: number, y: number) => x + y

    const res = apply(createNum).infixF(sum).infixR(2).res

    expect(res).toBe(5)
  })

  test('infix * 2', () => {
    const createNum = () => 3

    const sum = (x: number, y: number) => x + y

    const mul = (x: number, y: number) => x * y

    // (3 + 2) * 2 = 10
    const res = apply(createNum).infixF(sum).infixR(2).infixF(mul).infixR(2).res

    expect(res).toBe(10)
  })

  test('infix * 3', () => {
    const createNum = () => 3

    const sum = (x: number, y: number) => x + y

    const mul = (x: number, y: number) => x * y

    // (3 + 2) * 2 + 3 = 13
    const res = apply(createNum)
      .infixF(sum)
      .infixR(2)
      .infixF(mul)
      .infixR(2)
      .infixF(sum)
      .infixR(3).res

    expect(res).toBe(13)
  })

  test('infix * 4', () => {
    const createNum = () => 3

    const sum = (x: number, y: number) => x + y

    const mul = (x: number, y: number) => x * y

    // ((3 + 2) * 2 + 3) * 4  = 52
    const res = apply(createNum)
      .infixF(sum)
      .infixR(2)
      .infixF(mul)
      .infixR(2)
      .infixF(sum)
      .infixR(3)
      .infixF(mul)
      .infixR(4).res

    expect(res).toBe(52)
  })

  test('pipe then infix', () => {
    const createNum = () => 3

    const double = (x: number) => x * 2

    const sum = (x: number, y: number) => x + y

    const mul = (x: number, y: number) => x * y

    // 3 * 2 + 1
    const res = apply(createNum).pipe(double).infixF(sum).infixR(1).res

    expect(res).toBe(7)
  })
})
