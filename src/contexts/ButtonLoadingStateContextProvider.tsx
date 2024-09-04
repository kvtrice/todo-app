import { createContext, useState } from "react";

export const ButtonLoadingStateContext = createContext<
	ButtonLoadingStateContextType | undefined
>(undefined);

interface ButtonLoadingStateContextProviderProps {
	children: React.ReactNode;
}

interface ButtonLoadingStateContextType {
	isArchiveLoading: boolean;
	setIsArchiveLoading: React.Dispatch<React.SetStateAction<boolean>>;
	isSaveLoading: boolean;
	setIsSaveLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonLoadingStateContextProvider = ({
	children,
}: ButtonLoadingStateContextProviderProps) => {
	const [isArchiveLoading, setIsArchiveLoading] = useState(false);
	const [isSaveLoading, setIsSaveLoading] = useState(false);

	return (
		<ButtonLoadingStateContext.Provider
			value={{
				isArchiveLoading,
				setIsArchiveLoading,
				isSaveLoading,
				setIsSaveLoading,
			}}
		>
			{children}
		</ButtonLoadingStateContext.Provider>
	);
};

export default ButtonLoadingStateContextProvider;
