import { observable, action } from 'mobx'

type UserValues = {
	id?: number;
	email?: string;
	main_team?: string;
}

export class AuthStore {
	@observable isLogged: boolean = false
	@observable user: UserValues = {}

	@action
	setIsLogged = (data: boolean) => {
		this.isLogged = data
	}

	@action
	setUser = (data: UserValues) => {
		this.user = data
	}

	@action
	logout = () => {
		this.isLogged = false
		this.user = {}
	}
}