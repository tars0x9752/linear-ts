export function apply<T extends (...a: any[]) => any>(
  func: T,
  ...params: Parameters<T>
) {
  const res = func(...params)

  function infixF<RightVal, U>(
    func: (l: ReturnType<T>, r: RightVal) => U,
    left = res
  ) {
    return {
      infixR: (right: RightVal) => {
        return apply(func, left, right)
      },
    }
  }

  function pipe<U>(func2: (p: ReturnType<T>) => U, arg = res) {
    const next = apply(func2, arg)

    return {
      /**
       * chain other function
       */
      pipe: <V>(func3: (p: U) => V) => {
        return pipe(func3, next.res)
      },

      /**
       * chain, but infix style
       */
      infixF: <RightVal, V>(func3: (l: U, r: RightVal) => V) => {
        return infixF(func3, next.res)
      },

      /**
       * function evaluation result
       */
      res: next.res,
    }
  }

  return {
    /**
     * start another function application (no chain)
     */
    apply,

    /**
     * chain other function
     */
    pipe,

    /**
     * chain, but infix style
     */
    infixF,

    /**
     * function evaluation result
     */
    res,
  }
}

export function infixL<LeftVal>(left: LeftVal) {
  function infixF<RightVal, U>(func: (l: LeftVal, r: RightVal) => U) {
    return {
      /**
       * right argument taker
       */
      infixR: (right: RightVal) => {
        return apply(func, left, right)
      },
    }
  }

  return {
    infixF,
  }
}
