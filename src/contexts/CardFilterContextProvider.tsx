import { createContext, useState } from "react";

interface CardFilterContextType {
	categoryFilter: string;
	setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
	showArchived: boolean;
	setShowArchived: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CardFilterContextProviderProps {
	children: React.ReactNode;
}

export const CardFilterContext = createContext<
	CardFilterContextType | undefined
>(undefined);

const CardFilterContextProvider = ({
	children,
}: CardFilterContextProviderProps) => {
	const [categoryFilter, setCategoryFilter] = useState("");
	const [showArchived, setShowArchived] = useState(false);

	return (
		<CardFilterContext.Provider
			value={{
				categoryFilter,
				setCategoryFilter,
				showArchived,
				setShowArchived,
			}}
		>
			{children}
		</CardFilterContext.Provider>
	);
};
export default CardFilterContextProvider;
