import { useEffect, useState } from "react"
import { useParams } from "react-router"
import dayjs from 'dayjs'

import { getOrganization } from "../../../../../../api/admin/organizations"

import Form from "../form"

type Organization = {
	id: string;
	name: string;
}

type ParamType = {
	id: string;
}

type FormValues = {
  title: string;
	summary: string;
	opens_on: string;
	closes_on: string;
};

const Create: React.FC = () => {

	const { id } = useParams<ParamType>()
	const [loading, setLoading] = useState<boolean>(false)

	const [organization, setOrganization] = useState<Organization>()

	const onSubmit = (data: FormValues) => {
		data.opens_on = dayjs(data.opens_on).toISOString()
		data.closes_on = dayjs(data.closes_on).toISOString()
		console.log(data)
		
	}

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
		<div style={{background: "rgba(136, 128, 123, 0.3)"}}>
			<h1>Create a Quiz for {organization?.name}</h1>
			<Form 
				onSubmit={onSubmit}
				loading={loading}
			/>
		</div>
	)
}

export default Create