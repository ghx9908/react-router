import ReactDOM from "react-dom/client"
import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
} from "./react-router-dom"
import Home from "./components/Home"
import User from "./components/User"
import Profile from "./components/Profile"
import UserAdd from "./components/UserAdd"
import UserList from "./components/UserList"
import UserDetail from "./components/UserDetail"
const activeStyle = { backgroundColor: "green" }
const activeClassName = "active"
const activeNavProps = {
  style: ({ isActive }) => (isActive ? activeStyle : {}),
  className: ({ isActive }) => (isActive ? activeClassName : ""),
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ul>
      <li>
        <NavLink end={true} to="/" {...activeNavProps}>
          首页
        </NavLink>
      </li>
      <li>
        <NavLink to="/user" {...activeNavProps}>
          用户管理
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" {...activeNavProps}>
          个人中心
        </NavLink>
      </li>
    </ul>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />}>
        <Route path="add" element={<UserAdd />} />
        <Route path="list" element={<UserList />} />
        <Route path="detail/:id" element={<UserDetail />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
)
