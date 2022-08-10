import { FormProvider, useForm } from "react-hook-form"
import { Choice, Quiz, QuizItem } from "types"
import { classNames } from "utils"
import QuizItems from "./components/QuizItems"

export type ExtendedChoice = Choice & { uuid: string }
export type ExtendedQuizItem = Omit<QuizItem, 'choices'> & { choices: ExtendedChoice[] | [], uuid: string }
export type ExtendedQuiz = Omit<Quiz, 'items'> & { items: ExtendedQuizItem[] | [] }

const Form: React.FC = () => {

  const methods = useForm<ExtendedQuiz>({
    defaultValues: {
      items: [
        {
          question: "11",
          type: 'single',
          // choices: [
          //   {
          //     order: 0,
          //     value: "a",
          //     label: "a",
          //     isAnswer: false
          //   },
          //   {
          //     order: 1,
          //     value: "b",
          //     label: "b",
          //     isAnswer: true
          //   },
          //   {
          //     order: 2,
          //     value: "c",
          //     label: "c",
          //     isAnswer: false,
          //   },
          //   {
          //     order: 3,
          //     value: "d",
          //     label: "d",
          //     isAnswer: false
          //   }
          // ]
        },
        {
          question: "22",
          type: 'text'
        },
        {
          question: '33',
          type: 'multi',
          choices: [
            {
              order: 0,
              value: "aa",
              label: "aa"
            },
            {
              order: 1,
              value: "bb",
              label: "bb",
              isAnswer: true
            },
            {
              order: 2,
              value: "cc",
              label: "cc",
              isAnswer: true
            },
            {
              order: 3,
              value: "dd",
              label: "dd"
            }
          ]
        },
        // {
        //   question: '44',
        //   type: 'exact-text',
        // },
        // {
        //   question: "55",
        //   type: 'text'
        // },
        // {
        //   question: "66",
        //   type: 'text'
        // },
        // {
        //   question: "77",
        //   type: 'text'
        // },
        // {
        //   question: "88",
        //   type: 'text'
        // },
        // {
        //   question: "99",
        //   type: 'text'
        // }
      ]
    },
    // shouldUnregister: true
  })

  const { handleSubmit, formState: { errors } } = methods

  const onSubmit = handleSubmit(data => {

    console.log("data", data)
  })

  console.log('errors', errors)

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>

        <div>
          <div>
            <label>Title</label>
            <input
              {...methods.register('title')}
              className={classNames(
                "border",
                errors?.title ? "border-red-500" : ""
              )}
            />
          </div>
        </div>

        <QuizItems />
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </FormProvider>
  )
}

export default Form