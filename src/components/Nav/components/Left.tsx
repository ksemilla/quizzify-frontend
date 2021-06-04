import { useHistory } from "react-router-dom"
import styled from "styled-components"

const Logo = styled.div`
	font-weight: 500;
	font-size: 1.7rem;
	&:hover {
		cursor: pointer;
	}
`

const Left: React.FC = () => {

	const history = useHistory()

	const onRedirect = () => {
		history.push("/")
	}

	return (
		<Logo onClick={onRedirect} >
			Quizzify
		</Logo>
	)
}

export default Left