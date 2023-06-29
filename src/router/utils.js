export const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/")
//如果路径中有*就减少2
const splatPenalty = -2
const indexRouteValue = 2
const paramRegexp = /^:\w+$/
const dynamicSegmentValue = 3
const emptySegmentValue = 1
const staticSegmentValue = 10
const isSplat = (s) => s === "*" //console.log(computeScore('/user/*', 1));

function computeScore(path, index) {
  // /user/add
  let segments = path.split("/") //['','user','*']//3
  let initialScore = segments.length //3
  if (segments.some(isSplat)) {
    initialScore += splatPenalty //1
  }
  if (typeof index !== "undefined") {
    initialScore += indexRouteValue //3
  }
  //['','user','*']=>['','user']
  return segments
    .filter((s) => !isSplat(s))
    .reduce((score, segment) => {
      let currentScope = 0
      //如果这个片断是路径参数的话 :id
      if (paramRegexp.test(segment)) {
        currentScope += dynamicSegmentValue
      } else {
        if (segment === "") {
          currentScope += emptySegmentValue
        } else {
          currentScope += staticSegmentValue
        }
      }
      score += currentScope
      return score
    }, initialScore)
}
function rankRouteBranches(branches) {
  branches.sort((a, b) =>
    a.score !== b.score
      ? b.score - a.score
      : compareIndexes(
          a.routesMeta.map((meta) => meta.childrenIndex),
          b.routesMeta.map((meta) => meta.childrenIndex)
        )
  )
}
function compareIndexes(a, b) {
  let siblings =
    a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i])
  return siblings ? a[a.length - 1] - b[b.length - 1] : 0
}
export function matchRoutes(routes, location) {
  let { pathname } = location
  // 将嵌套的路由数组扁平化
  let branches = flattenRoutes(routes)
  rankRouteBranches(branches)
  console.log("branches====>", branches)
  let matches = null
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], pathname)
  }
  return matches
}

/**
 * 定义matchRouteBranch函数，用于匹配路由分支和路径名
 * @param {*} branch 分支
 * @param {*} pathname 路径名
 * @returns
 */
function matchRouteBranch(branch, pathname) {
  // 从branch中解构routesMeta
  let { routesMeta } = branch
  // 初始化匹配参数、匹配路径名、匹配数组
  let matchedParams = {}
  let matchedPathname = "/"
  let matches = []
  // 遍历routesMeta
  for (let i = 0; i < routesMeta.length; ++i) {
    // 获取当前元素的meta
    let meta = routesMeta[i]
    // 判断是否为最后一个元素
    let end = i === routesMeta.length - 1
    // 获取剩余路径名
    let remainingPathname =
      matchedPathname === "/"
        ? pathname
        : pathname.slice(matchedPathname.length) || "/"
    // 获取当前路径匹配结果
    let match = matchPath({ path: meta.relativePath, end }, remainingPathname)
    // 若没有匹配结果，返回null
    if (!match) return null
    // 将当前匹配参数合并到matchedParams
    Object.assign(matchedParams, match.params)
    // 获取当前路由
    let route = meta.route
    // 将匹配结果添加到matches数组
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      route,
    })
    // 更新匹配路径名
    matchedPathname = joinPaths([matchedPathname, match.pathname])
  }
  // 返回匹配结果数组
  return matches
}

// 定义一个函数，将嵌套的路由数组扁平化
function flattenRoutes(
  routes,
  branches = [],
  parentsMeta = [],
  parentPath = ""
) {
  // 定义一个内部函数，处理单个路由对象
  let flattenRoute = (route, index) => {
    // 定义一个元数据对象，存储路由相关信息
    let meta = {
      relativePath: route.path,
      childrenIndex: index,
      route,
    }
    // 使用 joinPaths 函数将父路径与当前相对路径组合，生成完整路径
    let path = joinPaths([parentPath, meta.relativePath])
    // 将当前路由元数据添加到父级元数据数组中
    let routesMeta = parentsMeta.concat(meta)
    // 如果当前路由对象有子路由，则递归处理
    if (route.children && route.children.length > 0) {
      flattenRoutes(route.children, branches, routesMeta, path)
    }
    // 将路径和元数据对象添加到结果数组中
    branches.push({ path, routesMeta, score: computeScore(path, route.index) })
  }
  // 遍历路由数组，调用内部函数处理每个路由对象
  routes.forEach((route, index) => {
    flattenRoute(route, index)
  })
  // 返回扁平化后的路由数组
  return branches
}

//获取当前路径匹配结果
export function matchPath({ path, end }, pathname) {
  let [matcher, paramNames] = compilePath(path, end)
  let match = pathname.match(matcher)
  if (!match) return null
  let matchedPathname = match[0]
  let captureGroups = match.slice(1)
  let params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = captureGroups[index]
    return memo
  }, {})
  return {
    params,
    pathname: matchedPathname,
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
  if (path === "*") {
    paramNames.push("*")
    regexpSource += "(.*)$"
  }
  if (end) {
    regexpSource += "$"
  }
  let matcher = new RegExp(regexpSource)
  return [matcher, paramNames]
}
