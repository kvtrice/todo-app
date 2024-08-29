import { createContext, useEffect, useState } from "react";
import { getAllCards } from "../services/card-services";
import { CardFetchResponse } from "../types/card";

export const CardContext = createContext<CardContextType | undefined>(
	undefined
);

interface CardContextProviderProps {
	children: React.ReactNode;
}

interface CardContextType {
	cards: CardFetchResponse[];
	setCards: React.Dispatch<React.SetStateAction<CardFetchResponse[]>>;
}

const CardContextProvider = ({ children }: CardContextProviderProps) => {
	const [cards, setCards] = useState<CardFetchResponse[]>([]);

	useEffect(() => {
		getAllCards().then(cards => setCards(cards));
	}, []);

	return (
		<CardContext.Provider value={{ cards, setCards }}>
			{children}
		</CardContext.Provider>
	);
};

export default CardContextProvider;
