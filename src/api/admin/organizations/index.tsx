import { PrivateAPI } from "../../../api"

type DataType = {
	name: string;
	slug: string;
}

export const getAllOrganizations = () => {
	const url = `api/organizations/`
	return PrivateAPI.get(url)
}

export const createOrganization = (data: DataType) => {
	const url = `api/organizations/`
	return PrivateAPI.post(url, data)
}