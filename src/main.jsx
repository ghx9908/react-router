import ReactDOM from "react-dom/client"
import { BrowserRouter, HashRouter, Routes, Route } from "./react-router-dom"
import Home from "./components/Home"
import User from "./components/User"
import Profile from "./components/Profile"
import Post from "./components/Post"
ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/post/:id" element={<Post />} />
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </HashRouter>
)
