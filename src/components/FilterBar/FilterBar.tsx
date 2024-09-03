import { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./FilterBar.module.scss";
import useCategoryContext from "../../hooks/useCategoryContext";
import useCardFilterContext from "../../hooks/useCardFilterContext";
import ManageCategories from "../ManageCategories/ManageCategories";

const FilterBar = () => {
	const [showManageCategoriesModal, setShowManageCategoriesModal] =
		useState(false);
	const { categories } = useCategoryContext();
	const { setCategoryFilter, setShowArchived, showArchived } =
		useCardFilterContext();

	const allCategories = [{ name: "All" }, ...categories];

	return (
		<>
			<div className={styles.filter}>
				<div className={styles.filter__left}>
					<div className={styles.filter__left__categories}>
						<label htmlFor="categories">Filter by category: </label>
						<select
							name="categories"
							id="categories"
							className={styles.filter__left__categories__select}
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
						<label htmlFor="showArchived">Show archived: </label>
						<input
							type="checkbox"
							checked={showArchived}
							id="showArchived"
							className={
								styles.filter__left__categories__checkbox
							}
							onChange={e => setShowArchived(e.target.checked)}
						/>
					</div>
				</div>
				<div className={styles.filter__manageCategories}>
					<button
						className={styles.filter__manageCategories__btn}
						onClick={() => setShowManageCategoriesModal(true)}
					>
						⚙️ Manage Categories
					</button>
				</div>
			</div>

			{showManageCategoriesModal && (
				<Modal
					handleModal={setShowManageCategoriesModal}
					title="Manage categories"
				>
					<ManageCategories setModal={setShowManageCategoriesModal} />
				</Modal>
			)}
		</>
	);
};

export default FilterBar;
