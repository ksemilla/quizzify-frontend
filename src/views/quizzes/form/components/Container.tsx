import type { FC } from 'react'
import { useCallback} from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ExtendedQuizItem } from '..'

import Question from './Question'

export interface Item {
  id: number
  text: string
}

export const Container: FC = () => {
  {
    const { getValues } = useFormContext()
    const { fields, append, move } = useFieldArray({
      name: 'items',
      keyName: 'uuid'
    })

    const moveQuestion = (dragIndex: number, hoverIndex: number) => {
      move(dragIndex, hoverIndex)
    }

    const renderQuestion = (item: ExtendedQuizItem, index: number) => {
        return (
          <Question
            key={item.uuid}
            index={index}
            id={item.id}
            moveQuestion={moveQuestion}
            item={item}
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
        <button
          onClick={onAppend}
        >Add Question</button>
      </>
    )
  }
}