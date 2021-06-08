type QuestionType = {
	uid?: string;
	order: number;
	question: string;
	answer: string;
	choices: {
		order: number;
		text: string;
	}[];
}

const Question: React.FC<QuestionType> = ({ question, order, choices }) => {
	return (
		<div style={{display: "flex", padding: "15px", background: "white", marginBottom: "5px"}}>
			<div>{order}</div>
			<div style={{flex: 1}}>
				{question}
				{choices.map(choice=>(
					<div style={{display: "flex"}}>
						<div>{String.fromCharCode(choice.order + 65)}</div>
						<div>{choice.text}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Question