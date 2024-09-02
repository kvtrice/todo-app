import { CategoryFormData, schema } from "./schema";
import {
	CategoryResponse,
	createCategory,
	deleteCategoryById,
	getAllCategories,
} from "../../services/category-services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategoryContext from "../../hooks/useCategoryContext";
import styles from "./CategoryForm.module.scss";
import { IoTrashOutline } from "react-icons/io5";

interface CategoryFormProps {
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryForm = ({ setModal }: CategoryFormProps) => {
	const {
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
		handleSubmit,
	} = useForm<CategoryFormData>({
		resolver: zodResolver(schema),
	});
	const { categories, setCategories } = useCategoryContext();

	isSubmitSuccessful && reset();

	const handleDeleteCategory = async (category: CategoryResponse) => {
		try {
			if (category.cards?.length > 0) {
				throw new Error(
					"Cannot delete category that is associated with existing cards"
				);
			} else {
				try {
					const deletedCategory = await deleteCategoryById(
						category.id
					);
					const newCategories = categories.filter(
						category => category.id !== deletedCategory.id
					);
					setCategories(newCategories);
				} catch (err) {
					console.log(err);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleAddNewCategory = async (category: CategoryFormData) => {
		try {
			await createCategory(category);
			const newCategories = await getAllCategories();
			setCategories(newCategories);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.categories__wrapper}>
			<div className={styles.categories}>
				{categories && (
					<div className={styles.categories__list}>
						{categories.map(category => (
							<div
								key={category.id}
								className={styles.categories__list__item}
							>
								<p
									className={
										styles.categories__list__item__name
									}
								>
									{category.name}
								</p>
								<div
									className={
										styles.categories__list__item__delete
									}
								>
									<IoTrashOutline
										className={
											styles.categories__list__item__delete__icon
										}
										size={18}
										onClick={() =>
											handleDeleteCategory(category)
										}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<form
				className={styles.categories__form}
				onSubmit={handleSubmit(handleAddNewCategory)}
			>
				<div className={styles.categories__form__field__wrapper}>
					<div className={styles.categories__form__field}>
						<input
							type="text"
							id="name"
							className={styles.categories__form__field__text}
							placeholder="Add a new category"
							{...register("name")}
						/>
					</div>
					<button
						type="submit"
						className={styles.categories__form__submit}
					>
						Add
					</button>
				</div>
				<div></div>
				{errors?.name && (
					<small className={styles.error}>
						{errors.name.message}
					</small>
				)}
			</form>

			<div className={styles.categories__btn}>
				<button
					className={styles.categories__btn__done}
					onClick={() => setModal(false)}
				>
					Done
				</button>
			</div>
		</div>
	);
};

export default CategoryForm;
