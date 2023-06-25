import React from "react"
import { useLocation, useParams } from "react-router-dom"
import { UserAPI } from "../../utils"
export default function UserDetail(props) {
  const location = useLocation()
  const { id } = useParams()
  const [user, setUser] = React.useState({})
  React.useEffect(() => {
    let user = location.state
    if (!user) {
      if (id) {
        user = UserAPI.find(id)
      }
    }
    if (user) setUser(user)
  }, [])
  return (
    <div>
      {user.id}:{user.name}
    </div>
  )
}
