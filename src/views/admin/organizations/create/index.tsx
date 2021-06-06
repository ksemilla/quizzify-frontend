import { useState } from "react"

import Form from "../form"
import {
	Header,
	AddNew,
	Empty
} from "../../../../styles/admin"
import { createOrganization } from "../../../../api/admin/organizations"


type FormValues = {
  name: string;
	slug: string;
};

const Create: React.FC = () => {

	const [loading, setLoading] = useState<boolean>(false)
	const onSubmit = (data: FormValues) => {
		console.log(data)
		createOrganization(data)
		.then(res=>{
			console.log(res.data)
		})
		.catch(res=>{
			console.log(res.response)
		})
	}

	return (
		<div>
			<Header>Creating new organization</Header>
			<Form
				onSubmitProp={onSubmit}
				loading={loading}
			/>
		</div>
	)
}

export default Create