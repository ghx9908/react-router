import React from "react"
import { LocationContext, NavigatorContext } from "./context"
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
  const { pathname } = location
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (pathname === route.path) {
      return route.element
    }
  }
}
