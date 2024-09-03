import { createContext, useEffect, useState } from "react";
import {
	CategoryResponse,
	getAllCategories,
} from "../services/category-services";
import useCardContext from "../hooks/useCardContext";

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
	const { cards } = useCardContext();

	useEffect(() => {
		getAllCategories().then(categories => {
			setCategories(categories);
		});
	}, [cards]);

	return (
		<CategoryContext.Provider value={{ categories, setCategories }}>
			{children}
		</CategoryContext.Provider>
	);
};

export default CategoryContextProvider;
