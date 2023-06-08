import { useState, useLayoutEffect, useRef } from "react"
import { Router, Routes, Route } from "../react-router"
export { Route, Routes }
import { createHashHistory, createBrowserHistory } from "@remix-run/router"
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
