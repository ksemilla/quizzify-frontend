import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getAllOrganizations } from "../../../../api/admin/organizations"

import Inline from "./components/Inline"
import {
	Header,
	AddNew,
	Empty
} from "../../../../styles/admin"

interface OrganizationType {
	id: number;
	name: string;
}

const List: React.FC = () => {

	const history = useHistory()
	const [loading, setLoading] = useState<boolean>(true)
	const [organizations, setOrganizations] = useState<OrganizationType[]>([])

	useEffect(()=>{
		getAllOrganizations()
		.then(res=>{
			setOrganizations(res.data)
			setLoading(false)
		})
		.catch(res=>{
			console.log(res.response)
			setLoading(false)
		})
	}, [])

	if (loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<Header>Organizations: <AddNew onClick={()=>history.push("/admin/organizations/create")}>Add New</AddNew></Header>
			{organizations.length === 0 && <Empty>It feels empty here.</Empty>}
			{organizations.map((org: OrganizationType)=><Inline key={org.id} organization={org} />)}
		</div>
	)
}

export default List