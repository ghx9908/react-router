import React, { useState, useLayoutEffect, useRef } from "react"
import { Router, Routes, Route } from "../react-router"
export { Route, Routes }
import { createHashHistory, createBrowserHistory } from "@remix-run/router"
export function BrowserRouter({ children }) {
  console.log("children=>", children)
  const historyRef = useRef()
  console.log("2222222=>", 2222222)
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory()
    console.log("   historyRef.current=>", historyRef.current)
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
  if (historyRef.current === null) {
    historyRef.current = createHashHistory()
  }
  const history = historyRef.current
  console.log("history=>", history)
  // const history = useMemo(() => createBrowserRouter(), [])
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
