import React from "react"
import { LocationContext, NavigationContext, RouteContext } from "./context"
import { matchRoutes } from "../../router"
export function useLocation() {
  const location = React.useContext(LocationContext)
  return location
}
/**
 * 用当前的路径和routes里面的path进行匹配,如果匹配上就渲染当前的element
 * @param {*} routes
 */
export function useRoutes(routes) {
  const location = useLocation()
  let pathname = location.pathname || "/"
  let matches = matchRoutes(routes, { pathname })
  console.log("matches=>", matches)
  if (matches) return renderMatches(matches)
}

// 导出一个名为 renderMatches 的函数，参数为 renderedMatches
export function renderMatches(renderedMatches) {
  // 使用 reduceRight 方法从右到左遍历 renderedMatches 数组，累计器初始值为 null
  return renderedMatches.reduceRight((outlet, match, index) => {
    // 获取当前元素之前的子数组，包含当前元素
    let matches = renderedMatches.slice(0, index + 1)
    // 返回一个 RouteContext.Provider 组件，将累计值和子数组作为值传递给组件
    return (
      <RouteContext.Provider value={{ outlet, matches }}>
        {match.route.element}
      </RouteContext.Provider>
    )
  }, null)
}
export function useNavigate() {
  let navigator = React.useContext(NavigationContext)
  let navigate = React.useCallback(
    (to, state) => {
      navigator.push(to, state)
    },
    [navigator]
  )
  return navigate
}

export function useOutlet() {
  let { outlet } = React.useContext(RouteContext)
  return outlet
}
export function useParams() {
  let { matches } = React.useContext(RouteContext)
  let routeMatch = matches[matches.length - 1]
  return routeMatch ? routeMatch.params : {}
}
