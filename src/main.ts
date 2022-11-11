interface NumWithLogs {
  res: number
  logs: string[]
}

function double (n: number): NumWithLogs {
  return {
    res: n * 2,
    logs: [`${n} * 2 = ${n * 2}`]
  }
}

function wrapWithLogs (n: number): NumWithLogs {
  return {
    res: n,
    logs: []
  }
}

function runWithLogs (input: NumWithLogs, transform: (_: number) => NumWithLogs): NumWithLogs {
  const { res, logs } = transform(input.res)

  return {
    res,
    logs: [...input.logs, ...logs]
  }
}

const ans = runWithLogs(wrapWithLogs(42), double)

console.log(JSON.stringify(ans, null, 2))
