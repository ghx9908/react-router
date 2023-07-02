import React from "react"
import { LocationContext, NavigationContext, RouteContext } from "./context"
import { matchRoutes } from "../../router"

// 获取 LocationContext 中的 location 对象
export function useLocation() {
  const location = React.useContext(LocationContext)
  return location
}

// 根据 routes 配置的路由表匹配当前 location,并渲染匹配的路由元素
export function useRoutes(routes) {
  const location = useLocation() // 获取当前 location 对象
  let pathname = location.pathname || "/" // 取 pathname,如果不存在则默认为 /
  let matches = matchRoutes(routes, { pathname }) // 使用 pathname 匹配 routes 路由表
  console.log("matches=>", matches)
  if (matches) return renderMatches(matches) // 匹配成功则渲染路由组件
}

// 从后向前渲染 matches 中匹配的路由元素
export function renderMatches(renderedMatches) {
  return renderedMatches.reduceRight((outlet, match, index) => {
    let matches = renderedMatches.slice(0, index + 1)
    return (
      <RouteContext.Provider value={{ outlet, matches }}>
        {/* 渲染当前匹配的路由组件 */}
        {match.route.element}
      </RouteContext.Provider>
    )
  }, null)
}

// 返回 react-router 的 navigate 函数
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

// 获取当前 Route 的 outlet
export function useOutlet() {
  let { outlet } = React.useContext(RouteContext)
  return outlet
}

// 获取当前 Route 的 params 对象
export function useParams() {
  let { matches } = React.useContext(RouteContext)
  let routeMatch = matches[matches.length - 1]
  return routeMatch ? routeMatch.params : {}
}
