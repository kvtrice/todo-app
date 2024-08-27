import { useContext, useState } from "react";
import { CategoryContext } from "../../contexts/CategoryContextProvider";
import { CardFilterContext } from "../../contexts/CardFilterContextProvider";
import Modal from "../Modal/Modal";
import CategoryForm from "../CategoryForm/CategoryForm";
import styles from "./FilterBar.module.scss";

const FilterBar = () => {
	const [showManageCategoriesModal, setShowManageCategoriesModal] =
		useState(false);
	const categoryContext = useContext(CategoryContext);
	const cardFilterContext = useContext(CardFilterContext);

	if (!categoryContext) {
		throw new Error("Unable to find category context");
	}

	if (!cardFilterContext) {
		throw new Error("Unable to find category filter context");
	}

	const { categories } = categoryContext;
	const { setCategoryFilter, setShowArchived, showArchived } =
		cardFilterContext;

	const allCategories = [{ name: "all" }, ...categories];

	return (
		<>
			<div className={styles.filter}>
				<div className={styles.filter__left}>
					<div className={styles.filter__left__categories}>
						<label htmlFor="categories">Categories: </label>
						<select
							name="categories"
							id="categories"
							onChange={e => setCategoryFilter(e.target.value)}
						>
							{allCategories.map(category => (
								<option
									key={category.name}
									value={category.name}
								>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<div className={styles.filter__left__archived}>
						<label htmlFor="showArchived">Show Archived</label>
						<input
							type="checkbox"
							checked={showArchived}
							id="showArchived"
							onChange={e => setShowArchived(e.target.checked)}
						/>
					</div>
				</div>
				<div className={styles.filter__manageCategories}>
					<button onClick={() => setShowManageCategoriesModal(true)}>
						⚙️ Manage Categories
					</button>
				</div>
			</div>
			{showManageCategoriesModal && (
				<Modal handleModal={setShowManageCategoriesModal}>
					<CategoryForm />
				</Modal>
			)}
		</>
	);
};

export default FilterBar;
