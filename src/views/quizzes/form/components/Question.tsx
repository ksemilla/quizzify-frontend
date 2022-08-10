import type { Identifier, XYCoord } from 'dnd-core'
import { FC, useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { classNames, useIsFirstRender } from 'utils'
import { ExtendedChoice, ExtendedQuizItem } from '..'
import Choice from './Choice'
import TextareaAutosize from 'react-textarea-autosize'
import { XCircleIcon } from '@heroicons/react/outline'

interface QuestionProps {
  id: any
  index: number
  moveQuestion: (dragIndex: number, hoverIndex: number) => void
  item: ExtendedQuizItem
  remove: (idx: number) => void;
}

interface DragItem {
  index: number
  id: string
  type: string
}

const Question: FC<QuestionProps> = ({ id, index, moveQuestion, remove: removeQuestion }) => {

  const { register, getValues, watch, unregister, formState: { errors }, setValue , clearErrors } = useFormContext()
  const { fields: choices, move, append, remove } = useFieldArray({
    name: `items.${index}.choices`,
    keyName: 'uuid'
  })

  const isFirstRender = useIsFirstRender()
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
          remove={remove}
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
    if (!isFirstRender) setValue(`items.${index}.choices`, [])
  }, [type])

  useEffect(()=>{
    register(`question-${index}`, { validate: () => { 
      const choicesLength = getValues(`items.${index}.choices`).length
      if (['single', 'multi'].includes(type) &&  choicesLength < 2) return false
      return true
     } })
  }, [])

  return (
    <div ref={previewRef} data-handler-id={handlerId}>
      <div
        className={classNames(
          "border rounded-md hover:bg-gray-100 p-4",
          isDragging ? "opacity-0" : "opacity-100",
          errors?.[`question-${index}`] ? "border-red-500" : "border-white"
        )}
      >
        <div className='flex space-x-2'>
          <div
            ref={dragRef}
            className={classNames(
              "w-12 flex items-start justify-center cursor-move hover:text-blue-500",
            )}
          >
            <div className='mt-2'>
              {index+1}.
            </div>
          </div>
          <TextareaAutosize
            {...register(`items.${index}.question`, { required: true })}
            className={classNames(
              "block flex-1 shadow-sm sm:text-sm rounded-md resize-none",
              errors?.items?.[index]?.question ? "focus:border-red-500 focus:ring-red-500 border-red-500" : "focus:border-indigo-500 focus:ring-indigo-500 border-gray-300"
            )}
            minRows={1}
          />
          <div className='w-32'>
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
          <div
            onClick={()=>removeQuestion(index)}
            className="w-8 flex justify-center mt-2"
          >
            <XCircleIcon className="h-5 w-5 hover:text-red-500 cursor-pointer"/>
          </div>
        </div>

        {(type === 'single' || type === 'multi') && <div className='space-y-1 mt-2'>
          {choices.map((choice: any, _idx) => (
            renderChoice(choice, _idx)
          ))}

          <button onClick={onAppend}
            className="ml-14 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Choice</button>
        </div>}
        {type === 'exact-text' && <div className='flex space-x-2'>
          <div className='w-12'/>
          <div className='flex-1'>
            <label className='text-gray-500 text-sm font-bold'>Answer</label>
            <TextareaAutosize
              {...register(`items.${index}.exact_text_answer`)}
              className='block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md resize-none font-medium'
            />
          </div>
          <div className='w-32' />
          <div className="w-8"/>
        </div>}
        
      </div>
      {errors?.[`question-${index}`] && <p>This question requires atleast 2 choices</p>}
    </div>
  )
}

export default Question