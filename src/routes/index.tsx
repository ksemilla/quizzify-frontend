import AuthWrapper from "containers/AuthWrapper"
import { Route, Routes } from "react-router-dom"
import { Quizzes } from "views"
import Login from "views/auth/Login"

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<AuthWrapper />}>
        <Route path="" element={<Quizzes />} />
      </Route>
      <Route path="/login" element={<Login />}/>
    </Routes>
  )
}

export default Router