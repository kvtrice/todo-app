import { CategoryFormData } from "../components/CategoryForm/schema";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface CategoryResponse {
	id: number;
	name: string;
	updatedAt: string;
	createdAt: string;
	cards: object[];
}

export const createCategory = async (categoryData: CategoryFormData) => {
	const response = await fetch(`${baseUrl}/categories`, {
		method: "POST",
		body: JSON.stringify(categoryData),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		if (errorResponse.errors) {
			const errorMessage = errorResponse.errors.name;
			throw new Error(`Could not create category: ${errorMessage}`);
		}
	}

	const category = await response.json();
	return category as CategoryResponse;
};

export const getAllCategories = async () => {
	const response = await fetch(`${baseUrl}/categories`);

	if (!response.ok) {
		throw new Error("Unable to fetch categories");
	}

	const categories = await response.json();
	return categories as CategoryResponse[];
};

export const getCategoryById = async (id: number) => {
	const response = await fetch(`${baseUrl}/categories/${id}`);

	if (!response.ok) {
		throw new Error("Unable to find category by id " + id);
	}

	const category = await response.json();
	return category as CategoryResponse;
};

export const deleteCategoryById = async (id: number) => {
	const response = await fetch(`${baseUrl}/categories/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Unable to delete category by id " + id);
	}

	const category = await response.json();
	return category as CategoryResponse;
};
