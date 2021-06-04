import axios from "axios"

import { API_URL } from "../../config"

type SignupData = {
	email: string;
	password: string;
}

export const signup = (data: SignupData) => {
	const url = `${API_URL}/api/users/signup/`
	return axios.post(url, data)
}