type Func<Parameter, Return> = (parameter: Parameter) => Return

function apply<T extends (...a: any[]) => any>(
  func: T,
  ...params: Parameters<T>
) {
  const res = func(params)

  function pipe<U>(nextFunc: (p: ReturnType<T>) => U) {
    return {
      pipe,
      res: nextFunc(res),
    }
  }

  function infixF<RightVal, U>(func: (l: ReturnType<T>, r: RightVal) => U) {
    return {
      infixR: (right: RightVal) => {
        return apply(func, res, right)
      },
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
     * the function evaluation result
     */
    res,
  }
}
