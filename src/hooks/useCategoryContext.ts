import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContextProvider";

const useCategoryContext = () => {
	const categoryContext = useContext(CategoryContext);

	if (!categoryContext) {
		throw new Error("Unable to find category context");
	}

	return categoryContext;
};

export default useCategoryContext;
