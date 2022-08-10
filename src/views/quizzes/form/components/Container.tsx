import type { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ExtendedQuizItem } from '..'

import Question from './Question'

export const Container: FC = () => {
  {
    const { getValues, clearErrors, unregister } = useFormContext()
    const { fields, append, move, remove } = useFieldArray({
      name: 'items',
      keyName: 'uuid'
    })

    const moveQuestion = (dragIndex: number, hoverIndex: number) => {
      move(dragIndex, hoverIndex)
      unregister([`question-${dragIndex}`, `question-${hoverIndex}`])
      clearErrors([`question-${dragIndex}`, `question-${hoverIndex}`])
    }

    const renderQuestion = (item: ExtendedQuizItem, index: number) => {
        return (
          <Question
            key={item.uuid}
            index={index}
            id={item.id}
            moveQuestion={moveQuestion}
            item={item}
            remove={remove}
          />
        )
      }
    

    const onAppend: React.MouseEventHandler<HTMLButtonElement> = e => {
      e.preventDefault()
      append({
        order: getValues('items').length
      })
    }

    return (
      <>
        <div
          className='space-y-6'
        >{fields.map((item: any, i) => renderQuestion(item, i))}</div>
        <hr />
        <button
          onClick={onAppend}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >Add Question</button>
      </>
    )
  }
}