import { CategoryFormData, schema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CategoryForm.module.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface CategoryFormProps {
	onSubmit: (category: CategoryFormData) => Promise<void>;
}

const CategoryForm = ({ onSubmit }: CategoryFormProps) => {
	const {
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
		handleSubmit,
	} = useForm<CategoryFormData>({
		resolver: zodResolver(schema),
	});

	isSubmitSuccessful && reset();

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className={styles.form__field__wrapper}>
				<div className={styles.form__field}>
					<input
						type="text"
						id="name"
						className={styles.form__field__text}
						placeholder="Add a new category"
						{...register("name")}
					/>
				</div>
				<button
					type="submit"
					className={styles.form__submit}
				>
					Add
				</button>
			</div>
			<div></div>
			{errors?.name && <ErrorMessage error={errors.name.message} />}
		</form>
	);
};

export default CategoryForm;
