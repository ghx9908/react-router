import Home from "./components/Home"
import User from "./components/User"
import Profile from "./components/Profile"
import UserAdd from "./components/UserAdd"
import UserDetail from "./components/UserDetail"
import UserList from "./components/UserList"
import NotFound from "./components/NotFound"
import Login from "./components/Login"
import Protected from "./components/Protected"
const routes = [
  { path: "/", element: <Home /> },
  // { path: "/profile", element: <Profile /> },
  {
    path: "user",
    element: <User />,
    children: [
      { path: "add", element: <UserAdd /> },
      { path: "list", element: <UserList /> },
      { path: "detail/:id", element: <UserDetail /> },
    ],
  },
  // { path: "/profile", element: <Protected component={Profile} /> },
  // { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]
export default routes
