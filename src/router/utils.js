export function matchRoutes(routes, location) {
  let { pathname } = location
  let match = null
  for (let i = 0; i < routes.length; ++i) {
    match = matchPath(routes[i].path, pathname)
    if (match) {
      match.route = routes[i]
      return match
    }
  }
}
export function matchPath(pattern, pathname) {
  let [matcher, paramNames] = compilePath(pattern, true)
  let match = pathname.match(matcher)
  if (!match) return null
  let captureGroups = match.slice(1)
  let params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = captureGroups[index]
    return memo
  }, {})
  return {
    params,
  }
}

function compilePath(path, end = true) {
  let paramNames = []
  let regexpSource =
    "^" +
    path
      .replace(/\/*\*?$/, "") //删除路径最后的 * 或 **,因为它们表示 0 个或多个路径片段,正则不需要
      .replace(/^\/*/, "/") // 确保路径以 / 开头
      .replace(/\/:(\w+)/g, (_, paramName) => {
        paramNames.push(paramName)
        return "/([^\\/]+)"
      })
  if (end) {
    regexpSource += "$"
  }
  let matcher = new RegExp(regexpSource)
  return [matcher, paramNames]
}
