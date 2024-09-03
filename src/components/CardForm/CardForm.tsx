import styles from "./CardForm.module.scss";
import { useForm } from "react-hook-form";
import { CardFormData, schema, Status } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUS_OPTIONS } from "../../constants/data";
import useCategoryContext from "../../hooks/useCategoryContext";

import ModalButtons from "../ModalButtons/ModalButtons";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface CardFormProps {
	onSubmit: (data: CardFormData) => unknown;
	defaultValues?: Partial<CardFormData>;
	formType?: FormType;
	onArchive?: () => unknown;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	archiveStatus: boolean;
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
	archiveStatus,
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
					<ErrorMessage error={errors.description.message} />
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
						<ErrorMessage error={errors.categoryId.message} />
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
						<ErrorMessage error={errors.status.message} />
					)}
				</div>
			</div>

			<ModalButtons
				onArchive={onArchive}
				formType={formType}
				setModal={setModal}
				archiveStatus={archiveStatus}
			/>
		</form>
	);
};

export default CardForm;
