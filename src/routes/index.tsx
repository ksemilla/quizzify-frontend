import { Route, Routes } from "react-router-dom"
import { Quizzes } from "views"

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Quizzes />} />
    </Routes>
  )
}

export default Router