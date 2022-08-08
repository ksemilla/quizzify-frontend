import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from "./Container"

const Example: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  )
}

export default Example