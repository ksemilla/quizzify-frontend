import { useHistory } from 'react-router-dom'
import { observer } from "mobx-react-lite"
import { useAuthStore } from "../../stores/auth"

import { verifyToken } from "../../api/auth"

const AuthContainer: React.FC = ({ children }) => {

	const authStore = useAuthStore()
	const history = useHistory()

	if (!authStore.authStore.isLogged) {
		let access = localStorage.getItem('access')
		if (access) {
			verifyToken(access)
			.then(res=>{
				authStore.authStore.setIsLogged(true)
				authStore.authStore.setUser(res.data.user)
				history.push("/")
			})
			.catch(res=>{
				localStorage.removeItem('access')
				history.push("/login")
			})
		}
	}

	return <>
		{children}
	</>
}

export default observer(AuthContainer)