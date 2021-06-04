import axios from "axios"

import { API_URL } from "../../config"

type LoginData = {
	username: string;
	password: string;
}

export const login = (data: LoginData) => {
	const url = `${API_URL}/api/token/`
	return axios.post(url, data)
}