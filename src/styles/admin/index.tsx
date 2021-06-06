import styled from 'styled-components'

export const Pill = styled.div`
	color: rgba(60, 145, 60, 0.9);
	border: 1px solid rgba(60, 145, 60, 0.9);
	border-radius: 5px;
	display: inline-block;
	padding: 10px 20px;
	&:hover {
		cursor: pointer;
	}
`

export const Header = styled.h1`
	border-bottom: 3px solid;
	padding-bottom: 15px;
`

export const AddNew = styled.span`
	&:hover {
		cursor: pointer;
		color: rgba(60, 145, 60, 0.9);
	}
`

export const Empty = styled.div`
	color: rgba(0,0,0,0.6);
	font-style: italic;
	font-weight: 500;
`