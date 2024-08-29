import { CategoryFormData, schema } from "./schema";
import {
	CategoryResponse,
	createCategory,
	deleteCategoryById,
} from "../../services/category-services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategoryContext from "../../hooks/useCategoryContext";
import styles from "./CategoryForm.module.scss";

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
			const createdCategory = await createCategory(category);
			const newCategories = [createdCategory, ...categories];
			setCategories(newCategories);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className={styles.category__list}>
				<h2 className={styles.category__heading}>Categories</h2>
				{categories &&
					categories.map(category => (
						<div
							key={category.id}
							className={styles.category}
						>
							<p className={styles.category__name}>
								{category.name}
							</p>
							<button
								className={styles.category__delete}
								onClick={() => handleDeleteCategory(category)}
							>
								Delete
							</button>
						</div>
					))}
			</div>
			<form
				className={styles.category__form}
				onSubmit={handleSubmit(handleAddNewCategory)}
			>
				<div className={styles.category__form__input}>
					<input
						type="text"
						id="name"
						placeholder="Add a new category"
						{...register("name")}
					/>
					{errors?.name && <small>{errors.name.message}</small>}
				</div>
				<button type="submit">Add</button>
			</form>
			<div className={styles.close}>
				<button
					className={styles.close__button}
					onClick={() => setModal(false)}
				>
					Done
				</button>
			</div>
		</div>
	);
};

export default CategoryForm;
