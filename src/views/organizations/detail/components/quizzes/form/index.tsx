import { useForm, useFieldArray } from "react-hook-form"
import ClipLoader from "../../../../../../components/elements/Cliploader"

import { v4 as uuidv4 } from 'uuid'
import Question from "./components/question"
import AddNewQuestion from "./components/AddNewQuestion"

import {
	FormGroup,
	Input,
	Label,
	Button,
	Error,
	Textarea,
} from "../../../../../../styles/form"
import { useState } from "react"

type FormValues = {
  title: string;
	summary: string;
	opens_on: string;
	closes_on: string;
};

type QuestionValue = {
	uid?: string;
	order: number;
	question: string;
	answer: string;
	choices: {
		uid?: string;
		order: number;
		text: string;
	}[];
}

type FormType = {
	onSubmit: (data: FormValues) => void;
	loading: boolean;
}

const Form: React.FC<FormType> = ({ onSubmit: onSubmitProp, loading }) => {

	const { register, handleSubmit, formState: { errors }, control} = useForm<FormValues>()
	const [questions, setQuestions] = useState<QuestionValue[]>([])

	const onSubmit = handleSubmit((data) => {
		onSubmitProp(data)
	})

	const onAddQuestion = (question: QuestionValue) => {
		setQuestions(prevState=>([
			...prevState,
			question
		]))
	}

	console.log(questions)

	return (
		<form
			onSubmit={onSubmit}
			style={{maxWidth: "700px", margin: "auto", padding: "20px 40px"}}
		>

			<div style={{borderBottom: "3px solid", paddingBottom: "10px", marginBottom: "20px"}}>
				<FormGroup>
					<Label>Title</Label>
					<Input
						type="text"
						{...register('title', {required: true})}
						color={errors.title ? "red" : ""}
					/>
					{errors.title && <Error>This field is required</Error>}
				</FormGroup>

				<FormGroup>
					<Label>Summary</Label>
					<Textarea
						minRows={3}
						{...register('summary', {required: true})}
						color={errors.summary ? "red" : ""}
					/>
					{errors.summary && <Error>This field is required</Error>}
				</FormGroup>

				<FormGroup>
					<Label>Opens On</Label>
					<Input
						type="datetime-local"
						{...register('opens_on', {required: true})}
						color={errors.opens_on ? "red" : ""}
					/>
					{errors.opens_on && <Error>This field is required</Error>}
				</FormGroup>

				<FormGroup>
					<Label>Closes On</Label>
					<Input
						type="datetime-local"
						{...register('closes_on', {required: true})}
						color={errors.closes_on ? "red" : ""}
					/>
					{errors.closes_on && <Error>This field is required</Error>}
				</FormGroup>

			</div>

			{questions.map((question, index: number) => {
				if (!("uid" in question)) {
					question["uid"] = uuidv4()
				}
				return (
					<Question
						key={question.uid}
						uid={question.uid}
						order={index + 1}
						question={question.question}
						answer={question.answer ? question.answer : ""}
						choices={question.choices}
					/>
				)
			})}

			<AddNewQuestion
				order={questions.length + 1}
				onAddQuestion={onAddQuestion}
			/>

			{loading && <ClipLoader />}
			{!loading && <Button
				type="submit"
			>
				Submit
			</Button>}

		</form>
	)
}

export default Form