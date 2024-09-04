import { useContext } from "react";
import { ButtonLoadingStateContext } from "../contexts/ButtonLoadingStateContextProvider";

const useButtonLoadingStateContext = () => {
	const buttonLoadingStateContext = useContext(ButtonLoadingStateContext);

	if (!buttonLoadingStateContext) {
		throw new Error("Unable to find button loading state context");
	}

	return buttonLoadingStateContext;
};

export default useButtonLoadingStateContext;
