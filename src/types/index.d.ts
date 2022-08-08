export type Quiz = {
  id: number,
  title: string,
  items: [QuizItem, ...QuizItem[]]
}

export type QuizItem = {
  id: number,
  order: number,
  question: string,
  choices: Choice[] | []
  type: 'single' | 'multi' | 'text' | 'exact-text',
  exactTextAnswer: string,
}

export type Choice = {
  id: number,
  order: number,
  label: string,
  value: string,
  isAnswer: boolean,
}