import React from "react"
import { useRoutes } from "./hooks"
import { NavigatorContext, LocationContext } from "./context"
/**
 *
 * @param {*} children  儿子Routes 虚拟Dom
 * @param {*} location  当前路径
 * @param {*} navigator history对象
 * @returns
 */
export function Router({ children, location, navigator, navigationType }) {
  return (
    <NavigatorContext.Provider value={navigator}>
      <LocationContext.Provider value={location}>
        {children}
      </LocationContext.Provider>
    </NavigatorContext.Provider>
  )
}

/**
 * 读取当前的路径，和每一个孩子的path做匹配，渲染匹配的组件
 * @param {*} param0
 * @returns
 */
export function Routes({ children }) {
  const routes = createRoutesFromChildren(children)
  return useRoutes(routes)
}

/**
 * 将虚拟Dom儿子转换成普通的js对象
 * @param {*} children
 * @returns
 */
function createRoutesFromChildren(children) {
  const routes = []
  React.Children.forEach(children, (child) => {
    let route = {
      path: child.props.path,
      element: child.props.element,
    }
    if (child.props.element.children) {
      createRoutesFromChildren(child.props.element.children)
    }
    routes.push(route)
  })

  return routes
}
export function Route({ children }) {
  return children
}
