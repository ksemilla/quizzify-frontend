import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

import { getOrganization } from "../../../api/admin/organizations"

type Organization = {
	id: string;
	name: string;
}

type ParamType = {
	id: string;
}

const Detail: React.FC = () => {

	const { id } = useParams<ParamType>()
	const history = useHistory()

	const [organization, setOrganization] = useState<Organization>()

	useEffect(()=>{
		getOrganization(id)
		.then(res=>{
			setOrganization(res.data)
		})
		.catch(res=>{
			console.log(res.response)
		})
	}, [])

	return (
		<div>
			<h1>{organization?.name}</h1>
			<div onClick={()=>history.push(`/organization/${organization?.id}/quizzes/create`)}>Create new quiz</div>
		</div>
	)
}

export default Detail