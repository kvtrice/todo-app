import { useState } from "react";
import useCategoryContext from "../../hooks/useCategoryContext";
import styles from "./ManageCategories.module.scss";
import {
	CategoryResponse,
	createCategory,
	deleteCategoryById,
	getAllCategories,
} from "../../services/category-services";
import { CategoryFormData } from "../CategoryForm/schema";
import CategoryForm from "../CategoryForm/CategoryForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { IoTrashOutline } from "react-icons/io5";

interface ManageCategoryProps {
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManageCategories = ({ setModal }: ManageCategoryProps) => {
	const { categories, setCategories } = useCategoryContext();
	const [error, setError] = useState<string>("");
	const [isAddLoading, setIsAddLoading] = useState(false);

	const handleDeleteCategory = async (category: CategoryResponse) => {
		setError("");
		try {
			if (category.cards?.length > 0) {
				throw new Error(
					"Cannot delete a category that is associated with existing cards (including archived cards)"
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
					if (err instanceof Error) {
						setError(err.message);
					}
				}
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			}
		}
	};

	const handleAddNewCategory = async (category: CategoryFormData) => {
		setError("");
		try {
			setIsAddLoading(true);
			await createCategory(category);
			const newCategories = await getAllCategories();
			setCategories(newCategories);
			setIsAddLoading(false);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			}
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
								<div
									className={
										styles.categories__list__item__wrapper
									}
								>
									<p
										className={
											styles.categories__list__item__name
										}
									>
										{category.name}
									</p>
									<p
										className={
											styles.categories__list__item__num
										}
									>
										{category.cards.length}{" "}
										{category.cards.length === 1
											? "card"
											: "cards"}
									</p>
								</div>
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
						{error && <ErrorMessage error={error} />}
					</div>
				)}
			</div>

			<CategoryForm
				onSubmit={handleAddNewCategory}
				isLoading={isAddLoading}
			/>

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
export default ManageCategories;
