import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContextProvider";
import { CategoryFormData, schema } from "./schema";
import {
	CategoryResponse,
	createCategory,
	deleteCategoryById,
} from "../../services/category-services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CategoryForm = () => {
	const {
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
		handleSubmit,
	} = useForm<CategoryFormData>({
		resolver: zodResolver(schema),
	});

	isSubmitSuccessful && reset();

	const categoryContext = useContext(CategoryContext);
	if (!categoryContext) {
		throw new Error("Unable to find category context");
	}
	const { categories, setCategories } = categoryContext;

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

	console.log(categories);

	return (
		<div>
			<div>
				{categories &&
					categories.map(category => (
						<div key={category.id}>
							<p>{category.name}</p>
							<button
								onClick={() => handleDeleteCategory(category)}
							>
								Delete
							</button>
						</div>
					))}
			</div>
			<form onSubmit={handleSubmit(handleAddNewCategory)}>
				<div>
					<label htmlFor="name">Add new category: </label>
					<input
						type="text"
						id="name"
						{...register("name")}
					/>
					{errors?.name && <small>{errors.name.message}</small>}
				</div>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default CategoryForm;
