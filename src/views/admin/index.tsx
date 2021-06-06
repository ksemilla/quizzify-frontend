import { useHistory } from "react-router"
import { Pill } from "../../styles/admin"

const Admin: React.FC = () => {
	const history = useHistory()
	return (
		<div>
			<h1>Admin</h1>
			<Pill
				onClick={()=>history.push("/admin/organizations")}
			>Organizations</Pill>
		</div>
	)
}

export default Admin