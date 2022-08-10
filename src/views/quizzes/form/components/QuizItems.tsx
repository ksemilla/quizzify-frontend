import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from "./Container"

const QuizItems: React.FC = () => {

  return (
    <div className="space-y-5">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  )
}

export default QuizItems