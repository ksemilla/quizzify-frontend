import styled from "styled-components"
import TextareaAutosize from 'react-textarea-autosize'

export const FormGroup = styled.div`
	margin-bottom: 15px;
`

export const FormGroupInline = styled.div`
	margin-bottom: 15px;
	display: flex;
	align-items: center;
`

export const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: 5px;
	border-radius: 3px;
	font-size: 1.1rem;
	font-weight: 500;
	font-family: Roboto;
	border: 1px solid ${props => props.color ? props.color : "black"};
	&:focus {
		outline: none;
		border: 1px solid rgb(129, 230, 166);
	}
`

export const Label = styled.label`
	font-weight: 500;
	display: block;
	font-size: 1.1rem;
	padding: 0px 0px 3px 0px;
	text-align: left;
`

export const Button = styled.button`
	display: block;
	color: white;
	background-color: rgba(60, 145, 60, 0.9);
	border: none;
	padding: 10px 20px;
	font-weight: 500;
	font-size: 1.1rem;
	border-radius: 5px;
	&:hover {
		cursor: pointer;
		background-color: rgba(60, 145, 60, 1);
	}
	&:focus {
		outline: none;
	}
`

export const Error = styled.div`
	font-weight: 500;
	font-size: 12px;
	color: red;
	padding: 2px 0px;
	text-align: left;
`

export const Textarea = styled(TextareaAutosize)`
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	box-sizing: border-box;
	padding: 5px;
	border-radius: 3px;
	font-size: 1.1rem;
	font-weight: 500;
	font-family: Roboto;
	border: 1px solid ${props => props.color ? props.color : "black"};
	&:focus {
		outline: none;
		border: 1px solid rgb(129, 230, 166);
	}
`