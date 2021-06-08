import { useHistory } from "react-router"
import styled from "styled-components"

const Element = styled.div`
	&:hover {
		cursor: pointer;
		color: rgba(60, 145, 60, 0.9);
	}
`

type InlineType = {
	organization: {
		id: number;
		name: string;
	}
}

const Inline: React.FC<InlineType> = ({ organization }) => {
	const history = useHistory()
	return (
		<Element onClick={()=>history.push(`/organization/${organization.id}`)}>
			{organization.name}
		</Element>
	)
}

export default Inline