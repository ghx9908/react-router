import ReactDOM from "react-dom/client"
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Link,
} from "./react-router-dom"
import Home from "./components/Home"
import User from "./components/User"
import Profile from "./components/Profile"
import Post from "./components/Post"
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ul>
      <li>
        <Link to="/">首页</Link>
      </li>
      <li>
        <Link to="/user">用户管理</Link>
      </li>
      <li>
        <Link to="/profile">个人中心</Link>
      </li>
    </ul>
    <Routes>
      <Route path="/post/:id" element={<Post />} />
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
)
