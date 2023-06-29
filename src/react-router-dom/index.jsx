/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { useState, useLayoutEffect, useRef } from "react"
import {
  Router,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
  useParams,
  Navigate
} from "../react-router"
export { Route, Routes, Outlet,Navigate, useNavigate, useLocation, useParams }
import { createHashHistory, createBrowserHistory } from "../router"
export function BrowserRouter({ children }) {
  const historyRef = useRef()
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory()
  }
  const history = historyRef.current

  const [state, setState] = useState(
    {
      location: history.location,
      action: history.action,
    },
    history
  )
  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    />
  )
}

export function HashRouter({ children }) {
  const historyRef = useRef()
  if (historyRef.current == null) {
    historyRef.current = createHashHistory()
  }
  const history = historyRef.current
  const [state, setState] = useState(
    {
      location: history.location,
      action: history.action,
    },
    history
  )
  useLayoutEffect(() => {
    history.listen(setState)
  }, [history])
  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    />
  )
}

export const Link = function (props) {
  const { to, state, ...rest } = props
  const navigate = useNavigate()
  function handleClick(event) {
    event.preventDefault()
    navigate(to, state)
  }
  return <a {...rest} onClick={handleClick} />
}

/**
 * @param {*} className 类名 可以是固定的字符串，也可以是一个函数，函数的参数是isActive
 * @param {*} end 是否结束
 * @param {*} style 行内样式 可以是固定的字符串，也可以是一个函数，函数的参数是isActive
 * @param {*} to 点击导航跳转的路径
 * @param {*} children 子组件
 */
export function NavLink({
  className: classNameProp = "",
  end = false,
  style: styleProp = {},
  to,
  children,
  ...rest
}) {
  let location = useLocation()
  let path = { pathname: to }
  let locationPathname = location.pathname //当前的路径
  let toPathname = path.pathname //当前导航想要跳转的路径
  //如果路径一样，或者 不结束，并且当前的路径是以to开头的，并且下一个字符/，也就是路径路径分隔符
  let isActive =
    locationPathname === toPathname ||
    (!end &&
      locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(toPathname.length) === "/")
  let className
  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive,
    })
  }
  let style
  if (typeof styleProp === "function") {
    style = styleProp({
      isActive,
    })
  }
  return (
    <Link {...rest} to={to} className={className} style={style}>
      {children}
    </Link>
  )
}
