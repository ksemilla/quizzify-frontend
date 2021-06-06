import { useForm } from "react-hook-form"

import ClipLoader from "../../../../components/elements/Cliploader"
import {
	FormGroup,
	Input,
	Label,
	Button,
	Error,
} from "../../../../styles/form"

type FormType = {
	initialValues?: {
		name: string;
	};
	onSubmitProp: (data: FormValues) => void;
	loading: boolean;
}

type FormValues = {
  name: string;
	slug: string;
};

const Form: React.FC<FormType> = ({ onSubmitProp, loading, initialValues }) => {

	const { register, handleSubmit, formState: { errors }} = useForm<FormValues>({
		defaultValues: initialValues
	})

	const onSubmit = handleSubmit((data) => {
		onSubmitProp(data)
	})

	return (
		<form onSubmit={onSubmit}>
			
			<FormGroup>
				<Label>Name</Label>
				<Input
					type="text"
					{...register('name', {required: true})}
					color={errors.name ? "red" : ""}
				/>
				{errors.name && <Error>This field is required</Error>}
			</FormGroup>

			<FormGroup>
				<Label>Slug</Label>
				<Input
					type="text"
					{...register('slug', {required: true})}
					color={errors.slug ? "red" : ""}
				/>
				{errors.slug && <Error>This field is required</Error>}
			</FormGroup>

			{loading && <ClipLoader />}
			{!loading && <Button
				type="submit"
			>
				Submit
			</Button>}

		</form>
	)
}

export default Form