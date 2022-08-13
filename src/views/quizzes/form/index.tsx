import { FormProvider, useForm } from "react-hook-form"
import { Choice, Quiz, QuizItem } from "types"
import { classNames } from "utils"
import PrimaryInfo from "./components/PrimaryInfo"
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

  const { handleSubmit } = methods

  const onSubmit = handleSubmit(data => {
    console.log("data", data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="space-y-2">
          <PrimaryInfo />
          <div className="border-2 border-black w-full border-gray-500" />
          <QuizItems />
          <div className="border-2 border-black w-full border-gray-500" />
          <div>
            <button 
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent text-md font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default Form