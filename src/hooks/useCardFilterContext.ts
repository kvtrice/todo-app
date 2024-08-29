import { useContext } from "react";
import { CardFilterContext } from "../contexts/CardFilterContextProvider";

export const useCardFilterContext = () => {
	const cardFilterContext = useContext(CardFilterContext);

	if (!cardFilterContext) {
		throw new Error("Unable to find category filter context");
	}

	return cardFilterContext;
};

export default useCardFilterContext;
