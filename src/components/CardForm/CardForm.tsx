import styles from "./CardForm.module.scss";
import { useForm } from "react-hook-form";
import { CardFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface CardFormProps {
	onSubmit: (data: CardFormData) => void;
	defaultValues?: CardFormData;
	formType?: FormType;
}

type FormType = "CREATE" | "EDIT";

const CardForm = ({
	onSubmit,
	defaultValues = {
		description: "",
		status: "",
		category: "",
		isArchived: false,
	},
	formType = "CREATE",
}: CardFormProps) => {
	const {
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
		handleSubmit,
	} = useForm<CardFormData>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	isSubmitSuccessful && reset();

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
			>
				<div className={styles.form__field}>
					<label htmlFor="description">Task Description: </label>
					<textarea
						id="description"
						{...register("description")}
					></textarea>
					{errors?.description && (
						<small>{errors.description.message}</small>
					)}
				</div>
				{/* <div className={styles.form__field}>
					<label htmlFor="category">Choose a category: </label>
					<select
						id="category"
						{...register("category")}
					>
            
          </select>
					{errors?.category && (
						<small>{errors.category.message}</small>
					)}
				</div> */}
			</form>
		</>
	);
};
export default CardForm;
