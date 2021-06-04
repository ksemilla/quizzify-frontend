import { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import styled from "styled-components"
import { observer } from 'mobx-react-lite'
import { FaUserCircle } from "react-icons/fa";

import { useAuthStore } from "../../../stores/auth"

const Container = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`

const Pill = styled.div`
	margin: 15px;
	font-weight: 500;
	color: ${props=>props.color};
	&:hover {
		color: red;
		cursor: pointer;
	}
`

const Dynamic = styled.div`
	.show {
		display: flex;
	}

	.dontshow {
		display: none;
	}

	@media (max-width: 676px) {
		.dontshow {
			display: block;
			position: relative;
		}
		.dontshow:hover {
			cursor: pointer;
		}
		.show {
			display: none;
		}
	}
`

type ItemComponent = React.FC<{onClick?: any, color?: string}>
type MenuComponent = React.FC & { Item: ItemComponent }

const MenuItem: ItemComponent = ({ children, onClick, color }): JSX.Element => {
	return (
		<Pill
			onClick={onClick}
			color={color}
		>
			{children}
		</Pill>
	)
}

const Menu: MenuComponent = ({ children }): JSX.Element => {

	const [showMenu, setShowMenu] = useState<Boolean>(false)

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }

	const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

	return (
		<Dynamic>
			<div className="show">
				{children}
			</div>

			<div
				className="dontshow"
				onClick={()=>setShowMenu(data=>!data)}
				style={{position: "relative"}}
				ref={wrapperRef}
			>
				<i className="fa fa-bars" aria-hidden="true" style={{fontSize: "2rem"}}></i>
				{showMenu && <div style={{position: "absolute", right: 0, border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "white", width: "100px"}}>
						{children}
				</div>}
			</div>

		</Dynamic>
	)
}

Menu.Item = MenuItem

const Right: React.FC = () => {

	const history = useHistory()
	const location = useLocation()
	const authStore = useAuthStore()

	const [showMenu, setShowMenu] = useState<Boolean>(false)
	function useOutsideAlerter(ref: any) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }

	const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

	if (authStore.authStore.isLogged) {
		return (
			<Container>
				<Menu>
					<div
						ref={wrapperRef}
						style={{cursor: "pointer", position: "relative"}}
						onClick={()=>setShowMenu(!showMenu)}
					>
						<FaUserCircle size="2rem"/>
						{showMenu && <div style={{position: "absolute", right: 0, border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "white", width: "100px"}}>
							<Pill onClick={()=>history.push("/account")}>Account</Pill>
							<Pill onClick={()=>{
								localStorage.removeItem('access')
								authStore.authStore.logout()
								history.push("/login")
							}}>Logout</Pill>
						</div>}
					</div>
				</Menu>
			</Container>
		)
	}

	return (
		<Container>
			<Menu>
				<Menu.Item
					onClick={()=>history.push(`/login`)}
					color={location.pathname.includes("login") ? "red" : ""}
				>
					Login
				</Menu.Item>
				<Menu.Item
					onClick={()=>history.push(`/signup`)}
					color={location.pathname.includes("signup") ? "red" : ""}
				>
					Signup
				</Menu.Item>
			</Menu>
		</Container>
	)
}

export default observer(Right)