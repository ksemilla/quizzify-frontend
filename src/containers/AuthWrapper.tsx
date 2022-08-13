import { Navigate } from "react-router-dom"
import useAuthStore from "stores/auth"
import BaseContainer from "./BaseContainer"


const AuthWrapper = () => {
  const user = useAuthStore((state) => state.user)

  if (!user) return <Navigate to="/login" replace={true} />
  console.log(user)
  return (
    <BaseContainer />
  )
}

export default AuthWrapper