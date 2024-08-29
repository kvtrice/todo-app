import { useContext } from "react";
import { CardContext } from "../contexts/CardContextProvider";

const useCardContext = () => {
	const cardContext = useContext(CardContext);

	if (!cardContext) {
		throw new Error("Unable to find card context");
	}

	return cardContext;
};

export default useCardContext;
