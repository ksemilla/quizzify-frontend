import { useState } from 'react'
import { useHistory } from "react-router-dom"

import Form from "./components/Form"
import { signup } from "../../api/signup"
import { SignupContainer, SignupHeader } from "../../styles/signup"
import { ErrorMessage } from '../../styles/utils'

type FormValues = {
  email: string;
	password: string;
	confirm_password: string;
};

const Signup: React.FC = () => {

	const history = useHistory()
	const [error, setError] = useState<null | string>()

	const onSubmit = (data: FormValues) => {
		signup(data)
		.then(res=>{
			history.push('/login')
		})
		.catch(res=>{
			setError(res.response.data.error)
		})
	}

	return (
		<SignupContainer>
			<SignupHeader>Signup</SignupHeader>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form
				onSubmitProp={onSubmit}
			/>
		</SignupContainer>
	)
}

export default Signup