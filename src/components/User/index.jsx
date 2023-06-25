import { Link, Outlet } from "react-router-dom"
function User() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/user/list">用户列表</Link>
        </li>
        <li>
          <Link to="/user/add">添加用户</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
export default User
