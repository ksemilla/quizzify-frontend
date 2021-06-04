import { useState } from 'react'
import { useHistory } from "react-router-dom"

import { SignupContainer, SignupHeader } from "../../styles/signup"
import { ErrorMessage } from '../../styles/utils'
import Form from "./components/Form"
import { login } from "../../api/login"
import { useAuthStore } from '../../stores/auth'
import { observer } from 'mobx-react-lite'

type FormValues = {
  username: string;
	password: string;
	remember: boolean;
};

const Login: React.FC = () => {

	const authStore = useAuthStore()
	const history = useHistory()

	const [error, setError] = useState<null | string>()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const onSubmit = (data: FormValues) => {
		setIsLoading(true)
		login(data)
		.then(res=>{
			setIsLoading(false)
			if (data.remember) {
				localStorage.setItem('access', res.data.access)
			}
			authStore.authStore.setIsLogged(true)
			authStore.authStore.setUser(res.data.user)
			history.push("/")
		})
		.catch(res=>{
			setIsLoading(false)
			if (res.response.data.detail) {
				setError(res.response.data.detail)
			}
		})
	}

	return (
		<SignupContainer>
			<SignupHeader>Login</SignupHeader>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form 
				onSubmitProp={onSubmit}
				isLoading={isLoading}
			/>
		</SignupContainer>
	)
}

export default observer(Login)