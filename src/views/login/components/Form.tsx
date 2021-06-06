import { useForm } from "react-hook-form"
import styled from "styled-components"
import ClipLoader from "../../../components/elements/Cliploader"

import {
	FormGroup,
	Input,
	Label,
	Button,
	Error,
} from "../../../styles/form"

type FormType = {
	onSubmitProp: (data: FormValues) => void;
	isLoading: boolean;
}

type FormValues = {
  username: string;
	password: string;
	remember: boolean;
};

const FormContainer = styled.form`
	padding: 0px 5px 5px 5px;
	max-width: 400px;
	margin: auto;
`

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 30px 0px;
`

const InlineWrapper = styled.div`
	display: flex;
	margin-bottom: 30px;
`

const Form: React.FC<FormType> = ({ onSubmitProp, isLoading }) => {

	const { register, handleSubmit, formState: { errors }} = useForm<FormValues>()

	const onSubmit = handleSubmit((data) => {
		onSubmitProp(data)
	})

	
	return (
		<FormContainer
			onSubmit={onSubmit}
		>
			<FormGroup>
				<Label>Email</Label>
				<Input
					type="email"
					{...register('username', {required: true})}
					color={errors.username ? "red" : ""}
				/>
				{errors.username && <Error>This field is required</Error>}
			</FormGroup>

			<FormGroup>
				<Label>Password</Label>
				<Input
					type="password"
					{...register('password', {required: true, minLength: 1})}
					color={errors.password ? "red" : ""}
				/>
				{errors.password?.type === 'required' && <Error>This field is required</Error>}
				{errors.password?.type === 'minLength' && <Error>Minimum of 6 characters</Error>}
			</FormGroup>

			<InlineWrapper>
				<input
					type="checkbox"
					{...register('remember')}
				/>
				<Label>Remember me</Label>
			</InlineWrapper>

			<ButtonWrapper>
				{isLoading && <ClipLoader />}
				{!isLoading && <Button
					type="submit"
				>
					Login
				</Button>}
			</ButtonWrapper>
		</FormContainer>
	)
}

export default Form