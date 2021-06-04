import { useForm, useWatch } from "react-hook-form"
import styled from "styled-components"

import {
	FormGroup,
	Input,
	Label,
	Button,
	Error,
} from "../../../styles/form"

type FormType = {
	onSubmitProp: (data: FormValues) => void;
}

type FormValues = {
  email: string;
	password: string;
	confirm_password: string;
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

const Form: React.FC<FormType> = ({ onSubmitProp }) => {

	const { register, handleSubmit, formState: { errors }, control} = useForm<FormValues>()

	const password = useWatch({
		control,
		name: 'password'
	})

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
					{...register('email', {required: true})}
					color={errors.email ? "red" : ""}
				/>
				{errors.email && <Error>This field is required</Error>}
			</FormGroup>

			<FormGroup>
				<Label>Password</Label>
				<Input
					type="password"
					{...register('password', {required: true, minLength: 6})}
					color={errors.password ? "red" : ""}
				/>
				{errors.password?.type === 'required' && <Error>This field is required</Error>}
				{errors.password?.type === 'minLength' && <Error>Minimum of 6 characters</Error>}
			</FormGroup>

			<FormGroup>
				<Label>Confirm Password</Label>
				<Input
					type="password"
					{...register('confirm_password', {required: true, validate: {equal: value => password === value}})}
					color={errors.confirm_password ? "red" : ""}
				/>
				{errors.confirm_password?.type === 'required' && <Error>This field is required</Error>}
				{errors.confirm_password?.type === 'equal' && <Error>This should be the same as password</Error>}
			</FormGroup>

			<ButtonWrapper>
				<Button
					type="submit"
				>
					Create Account
				</Button>
			</ButtonWrapper>
		</FormContainer>
	)
}

export default Form