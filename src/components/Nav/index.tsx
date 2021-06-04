import Left from "./components/Left"
import Right from "./components/Right"

import { NavContainer } from "../../styles/nav"

const Nav: React.FC = () => {
	return (
		<NavContainer>
			<Left />
			<Right />
		</NavContainer>
	)
}

export default Nav