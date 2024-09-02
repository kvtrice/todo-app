import styles from "./CardForm.module.scss";
import { useForm } from "react-hook-form";
import { CardFormData, schema, Status } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUS_OPTIONS } from "../../constants/data";
import useCategoryContext from "../../hooks/useCategoryContext";

import ModalButtons from "../ModalButtons/ModalButtons";

interface CardFormProps {
	onSubmit: (data: CardFormData) => unknown;
	defaultValues?: Partial<CardFormData>;
	formType?: FormType;
	onArchive?: () => unknown;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FormType = "CREATE" | "EDIT";

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
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
		>
			<div className={styles.form__field}>
				<label
					className={styles.form__field__label}
					htmlFor="description"
				>
					Description{" "}
				</label>
				<textarea
					className={styles.form__field__textarea}
					id="description"
					rows={3}
					placeholder="Start typing..."
					{...register("description")}
				/>
				{errors?.description && (
					<small className={styles.error}>
						{errors.description.message}
					</small>
				)}
			</div>
			<div className={styles.form__dropdowns}>
				<div className={styles.form__dropdowns__field}>
					<label
						className={styles.form__dropdowns__field__label}
						htmlFor="category"
					>
						Category{" "}
					</label>
					<select
						className={styles.form__dropdowns__field__select}
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
						<small className={styles.error}>
							{errors.categoryId.message}
						</small>
					)}
				</div>
				<div className={styles.form__dropdowns__field}>
					<label
						className={styles.form__dropdowns__field__label}
						htmlFor="status"
					>
						Status{" "}
					</label>
					<select
						id="status"
						className={styles.form__dropdowns__field__select}
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
					{errors?.status && (
						<small className={styles.error}>
							{errors.status.message}
						</small>
					)}
				</div>
			</div>

			<ModalButtons
				onArchive={onArchive}
				formType={formType}
				setModal={setModal}
			/>
		</form>
	);
};

export default CardForm;
