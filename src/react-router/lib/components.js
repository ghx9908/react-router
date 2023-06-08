import React from "react"
/**
 *
 * @param {*} children  儿子Routes 虚拟Dom
 * @param {*} location  当前路径
 * @param {*} navigator history对象
 * @returns
 */
export function Router({ children, location, navigator, navigationType }) {
  console.log("children=1111>", children)
  return children
}

/**
 * 读取当前的路径，和每一个孩子的path做匹配，渲染匹配的组件
 * @param {*} param0
 * @returns
 */
export function Routes({ children }) {
  const routes = createRoutesFromChildren(children)
  console.log("routes=>", routes)
  return null
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
      elemetn: child.props.element,
    }
    routes.push(route)
  })

  return routes
}
export function Route({ children }) {
  return children
}
