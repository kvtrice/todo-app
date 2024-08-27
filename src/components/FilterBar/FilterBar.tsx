import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContextProvider";
import { CardFilterContext } from "../../contexts/CardFilterContextProvider";

const FilterBar = () => {
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
		<div>
			<div>
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
			<div>
				<label htmlFor="showArchived">Show Archived</label>
				<input
					type="checkbox"
					checked={showArchived}
					id="showArchived"
					onChange={e => setShowArchived(e.target.checked)}
				/>
			</div>
		</div>
	);
};

export default FilterBar;
