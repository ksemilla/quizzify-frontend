import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Redirect, useHistory } from 'react-router-dom';

import Nav from "./components/Nav"

import Routes from "./routes"

import { verifyToken } from "./api/auth"
import { useAuthStore } from './stores/auth';
import { AppContainer } from "./styles/containers"
import AuthContainer from "./components/containers/AuthContainer"

const App: React.FC = () => {

	// const authStore = useAuthStore()
	// const history = useHistory()

	// if (!authStore.authStore.isLogged) {
	// 	let access = localStorage.getItem('access')
	// 	if (access) {
	// 		verifyToken(access)
	// 		.then(res=>{
	// 			console.log("GOT HERE 1",res.data)
	// 			authStore.authStore.setIsLogged(true)
	// 			authStore.authStore.setUser(res.data.user)
	// 		})
	// 		.catch(res=>{
	// 			console.log("CATCH",res.response)
	// 		})
	// 	}
	// }
	// console.log("APP.tsx",authStore.authStore.isLogged)
  return (
		<AppContainer>
			<Router>
				<AuthContainer>
					<Nav />
					<Routes />
				</AuthContainer>
			</Router>
		</AppContainer>
  );
}

export default observer(App);
