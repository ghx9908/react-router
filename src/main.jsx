import ReactDOM from "react-dom/client"
import { BrowserRouter, HashRouter, Routes, Route } from "./react-router-dom"
import Home from "./components/Home"
import User from "./components/User"
import Profile from "./components/Profile"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
)
