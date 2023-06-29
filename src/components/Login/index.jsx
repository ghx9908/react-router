import React from "react"
import { useNavigate, useLocation } from "../../react-router-dom"
function Login() {
  let navigation = useNavigate()
  let location = useLocation()
  const login = () => {
    localStorage.setItem("login", "true")
    let to = "/"
    if (location.state) {
      to = location.state.from || "/"
    }
    navigation(to)
  }
  return <button onClick={login}>登录</button>
}
export default Login
