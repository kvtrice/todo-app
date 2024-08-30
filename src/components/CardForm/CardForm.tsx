import styles from "./CardForm.module.scss";
import { useForm } from "react-hook-form";
import { CardFormData, schema, Status } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUS_OPTIONS } from "../../constants/data";
import useCategoryContext from "../../hooks/useCategoryContext";

interface CardFormProps {
	onSubmit: (data: CardFormData) => unknown;
	defaultValues?: Partial<CardFormData>;
	formType?: FormType;
	onArchive?: () => unknown;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormType = "CREATE" | "EDIT";

const CardForm = ({
	onSubmit,
	defaultValues = {
		description: "",
		status: Status.TODO,
		categoryId: 1,
		isArchived: false,
	},
	formType = "CREATE",
	onArchive,
	setModal,
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
	const { categories } = useCategoryContext();

	isSubmitSuccessful && reset();

	return (
		<>
			<div>
				<h2>{formType === "CREATE" ? "Add New" : "Edit "} Card</h2>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
			>
				<div className={styles.form__field}>
					<label htmlFor="description">Task Description: </label>
					<textarea
						id="description"
						{...register("description")}
					/>
					{errors?.description && (
						<small>{errors.description.message}</small>
					)}
				</div>
				<div className={styles.form__field}>
					<label htmlFor="category">Category: </label>
					<select
						id="category"
						{...register("categoryId", { valueAsNumber: true })}
					>
						{categories &&
							categories.map(category => (
								<option
									key={category.id}
									value={category.id}
								>
									{category.name}
								</option>
							))}
					</select>
					{errors?.categoryId && (
						<small>{errors.categoryId.message}</small>
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

				{formType === "EDIT" && onArchive && (
					<button
						type="button"
						onClick={() => onArchive()}
					>
						Archive Card
					</button>
				)}
				<button onClick={() => setModal(false)}>Cancel</button>
				<button type="submit">
					{formType === "CREATE" ? "Create" : "Update"} Card
				</button>
			</form>
		</>
	);
};

export default CardForm;
