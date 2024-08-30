import { createContext, useEffect, useState } from "react";
import {
	CategoryResponse,
	getAllCategories,
} from "../services/category-services";

export const CategoryContext = createContext<CategoryContextType | undefined>(
	undefined
);

interface CategoryContextProviderProps {
	children: React.ReactNode;
}

interface CategoryContextType {
	categories: CategoryResponse[];
	setCategories: React.Dispatch<React.SetStateAction<CategoryResponse[]>>;
}

const CategoryContextProvider = ({
	children,
}: CategoryContextProviderProps) => {
	const [categories, setCategories] = useState<CategoryResponse[]>([]);

	useEffect(() => {
		getAllCategories().then(categories => {
			setCategories(categories);
		});
	}, []);

	return (
		<CategoryContext.Provider value={{ categories, setCategories }}>
			{children}
		</CategoryContext.Provider>
	);
};

export default CategoryContextProvider;
