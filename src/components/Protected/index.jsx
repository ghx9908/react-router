import React from "react"
import { Navigate } from "../../react-router-dom"
function Protected(props) {
  let { component: RouteComponent, path } = props
  return localStorage.getItem("login") ? (
    <RouteComponent />
  ) : (
    <Navigate to="/login" state={{ from: path }} />
  )
}
export default Protected
