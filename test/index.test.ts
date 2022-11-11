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
})
