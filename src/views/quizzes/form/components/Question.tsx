import type { Identifier, XYCoord } from 'dnd-core'
import { FC, useEffect } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { classNames } from 'utils'
import { ExtendedChoice, ExtendedQuizItem } from '..'
import Choice from './Choice'
import TextareaAutosize from 'react-textarea-autosize'

interface QuestionProps {
  id: any
  index: number
  moveQuestion: (dragIndex: number, hoverIndex: number) => void
  item: ExtendedQuizItem
}

interface DragItem {
  index: number
  id: string
  type: string
}

const Question: FC<QuestionProps> = ({ id, index, moveQuestion }) => {

  const { register, getValues, watch, unregister, formState: { errors } } = useFormContext()
  const { fields: choices, move, append } = useFieldArray({
    name: `items.${index}.choices`,
    keyName: 'uuid'
  })

  const type = watch(`items.${index}.type`)

  const dragRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "question",
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
      moveQuestion(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      hoverItem.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: "question",
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(dragRef)
  drop(preview(previewRef))

  const moveChoice = (dragIndex: number, hoverIndex: number) => {
    move(dragIndex, hoverIndex)
  }
  const renderChoice = (choice: ExtendedChoice, idx: number) => {
      // console.log(choice.uuid)
      return (
        <Choice
          key={choice.uuid}
          index={idx}
          id={choice.id}
          moveChoice={moveChoice}
          choice={choice}
          questionIdx={index}
          questionType={type}
        />
      )
    }

  const onAppend: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    append({
      order: getValues(`items.${index}.choices`).length
    })
  }

  useEffect(()=>{
    if (type === 'text' || type === 'exact-text') {
      unregister(`items.${index}.choices`)
    }
  }, [type])

  return (
    <div
      ref={previewRef}
      data-handler-id={handlerId}
      className={classNames(
        isDragging ? "opacity-0" : "opacity-100"
      )}
    >
      <div className='flex border'>
        <div
          ref={dragRef}
          className={classNames(
            "w-12 flex items-start justify-center cursor-move hover:text-blue-500",
          )}
        >
          <div className='mt-2'>
            {index+1}
          </div>
        </div>
        <TextareaAutosize
          {...register(`items.${index}.question`, { required: true })}
          className={classNames(
            "block flex-1 shadow-sm sm:text-sm border-gray-300 rounded-md resize-none",
            errors?.items?.[index]?.question ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500"
          )}
          minRows={1}
        />
        <div>
          <select
            className='block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
            {...register(`items.${index}.type`)}
          >
            <option value="single">Single</option>
            <option value="multi">Multi</option>
            <option value="text">Text</option>
            <option value="exact-text">Exact-Text</option>
          </select>
        </div>
      </div>

      {(type === 'single' || type === 'multi') && <div className='space-y-1 mt-2'>
        {choices.map((choice: any, _idx) => (
          renderChoice(choice, _idx)
        ))}

        <button onClick={onAppend} className="ml-24">Add Choice</button>
      </div>}
      {type === 'exact-text' && <>
        <label>Answer</label>
        <textarea
          {...register(`items.${index}.exact_text_answer`)}
          className='block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
        />
      </>}

    </div>
  )
}

export default Question