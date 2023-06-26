import React from "react"
import { useRoutes, useOutlet } from "./hooks"
import { NavigationContext, LocationContext } from "./context"
/**
 *
 * @param {*} children  儿子Routes 虚拟Dom
 * @param {*} location  当前路径
 * @param {*} navigator history对象
 * @returns
 */
export function Router({ children, location, navigator, navigationType }) {
  return (
    <NavigationContext.Provider value={navigator}>
      <LocationContext.Provider value={location}>
        {children}
      </LocationContext.Provider>
    </NavigationContext.Provider>
  )
}

/**
 * 读取当前的路径，和每一个孩子的path做匹配，渲染匹配的组件
 * @param {*} param0
 * @returns
 */
export function Routes({ children }) {
  const routes = createRoutesFromChildren(children)
  console.log("routes===>", routes)
  return useRoutes(routes)
}

/**
 * 将虚拟Dom儿子转换成普通的js对象
 * @param {*} children
 * @returns
 */
function createRoutesFromChildren(children) {
  const routes = []
  React.Children.forEach(children, (element) => {
    let route = {
      path: element.props.path,
      element: element.props.element,
    }
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children)
    }
    routes.push(route)
  })

  return routes
}
export function Route({ children }) {
  return children
}

export function Outlet() {
  return useOutlet()
}
