import { useEffect, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useFormContext } from "react-hook-form"
import { classNames } from "utils"
import { ExtendedChoice } from ".."
import type { Identifier, XYCoord } from 'dnd-core'
import TextareaAutosize from 'react-textarea-autosize'
import { XCircleIcon } from "@heroicons/react/outline"

interface ChoiceProps {
  questionIdx: number,
  id: any
  index: number
  moveChoice: (dragIndex: number, hoverIndex: number) => void
  choice: ExtendedChoice,
  questionType: 'single' | 'multi' | 'text' | 'exact-text'
  remove: (idx: number) => void;
}

interface DragItem {
  index: number
  id: string
  type: string
}

const Choice: React.FC<ChoiceProps> = ({ id, index, questionIdx, moveChoice, questionType, choice, remove }) => {

  const { register, formState: { errors }, setValue, watch, getValues } = useFormContext()
  const isAnswer = watch(`items.${questionIdx}.choices.${index}.isAnswer`)

  // const dragRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: `${questionIdx}-choice`,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(hoverItem: DragItem, monitor) {
      if (!previewRef.current) {
        return
      }
      const dragIndex = hoverItem.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = previewRef.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveChoice(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      hoverItem.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: `${questionIdx}-choice`,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  // drag(dragRef)
  // drop(preview(previewRef))
  drag(drop(previewRef))

  const onSelect: React.MouseEventHandler<HTMLDivElement> = () => {
    if (questionType === 'multi') {
      setValue(`items.${questionIdx}.choices.${index}.isAnswer`, !isAnswer)
    } else if (questionType === 'single') {
      const choices = getValues(`items.${questionIdx}.choices`).map((_choice: ExtendedChoice, i: number) => {
        if (i === index) {
          return {..._choice, isAnswer: true}
        } else {
          return {..._choice, isAnswer: false}
        }
      })
      setValue(`items.${questionIdx}.choices`, choices)
    }
  }

  useEffect(()=>{
    setValue(`items.${questionIdx}.choices.${index}.order`, index)
  }, [index, choice])

  return (
    <div
      ref={previewRef}
      data-handler-id={handlerId}
      className={classNames(
        "flex space-x-2 rounded-md hover:bg-gray-200",
        isDragging ? "opacity-0" : "opacity-100",
      )}
    >
      <div
        // ref={dragRef}
        className="w-12 flex items-center justify-center text-3xl cursor-move "
        onClick={e=>e.stopPropagation()}
      >
        {/* &bull; */}
      </div>
      <div
        onClick={onSelect}
        className={classNames(
        "flex flex-1 p-1 rounded-md border ",
        isAnswer ? "border-green-500" : "border-transparent"
      )} >
        <div
          className={classNames(
            "w-12 flex items-center justify-center hover:text-blue-500",
          )}
        >{String.fromCharCode(index+65)}.</div>
          <TextareaAutosize
            {...register(`items.${questionIdx}.choices.${index}.value`, { required: true } )}
            className={classNames(
              "block w-full shadow-none sm:text-sm rounded-md font-medium resize-none",
              errors?.items?.[questionIdx]?.choices?.[index]?.value ? "focus:border-red-500 focus:ring-red-500 border-red-500" : "focus:border-indigo-500 focus:ring-indigo-500 border-none",
            )}
            onClick={e=>e.stopPropagation()}
          />
      </div>
      <div className="w-32 flex items-center"
        onClick={()=>remove(index)}
      ><XCircleIcon className="h-5 w-5 hover:text-red-500 cursor-pointer"/></div>
      <div className="w-8"/>
    </div>
  )
}

export default Choice