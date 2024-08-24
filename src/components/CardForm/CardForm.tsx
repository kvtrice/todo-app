import styles from "./CardForm.module.scss";
import { useForm } from "react-hook-form";
import { CardFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContextProvider";
import { STATUS_OPTIONS } from "../../constants/data";

interface CardFormProps {
	onSubmit: (data: CardFormData) => void;
	defaultValues?: Partial<CardFormData>;
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

	const categoryContext = useContext(CategoryContext);

	if (!categoryContext) {
		throw new Error("Unable to get Category Context");
	}

	const { categories } = categoryContext;

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
				<div className={styles.form__field}>
					<label htmlFor="category">Category: </label>
					<select
						id="category"
						{...register("category")}
					>
						{categories &&
							categories.map(category => (
								<option
									key={category.id}
									value={category.name}
								>
									{category.name}
								</option>
							))}
					</select>
					{errors?.category && (
						<small>{errors.category.message}</small>
					)}
				</div>
				<div className={styles.form__field}>
					<label htmlFor="status">Status: </label>
					<select
						id="status"
						{...register("status")}
					>
						{STATUS_OPTIONS.map(status => (
							<option
								key={status.value}
								value={status.value}
							>
								{status.label}
							</option>
						))}
					</select>
					{errors?.status && <small>{errors.status.message}</small>}
				</div>
				<button>
					{formType === "CREATE" ? "Create" : "Update"} Card
				</button>
			</form>
		</>
	);
};

export default CardForm;
