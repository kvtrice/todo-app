import { CardFormData } from "../components/CardForm/schema";
import { CardFetchResponse, CardResponse } from "../types/card";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const createCard = async (cardData: CardFormData) => {
	const response = await fetch(`${baseUrl}/cards`, {
		method: "POST",
		body: JSON.stringify({
			...cardData,
			status: cardData.status.toString(),
			categoryId: Number(cardData.categoryId),
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Unable to create card");
	}

	return (await response.json()) as CardResponse;
};

export const getAllCards = async () => {
	const response = await fetch(`${baseUrl}/cards`);

	if (!response.ok) {
		throw new Error("Unable to fetch cards");
	}

	const cards = await response.json();
	return cards as CardFetchResponse[];
};

export const getCardsByCategory = async (category: string) => {
	const response = await fetch(`${baseUrl}/cards?category=${category}`);

	if (!response.ok) {
		throw new Error("Unable to fetch cards");
	}

	const cards = await response.json();
	return cards as CardFetchResponse[];
};

export const getCardById = async (id: number) => {
	const response = await fetch(`${baseUrl}/cards/${id}`);

	if (!response.ok) {
		throw new Error("Unable to find card");
	}

	const card = await response.json();
	return card as CardFetchResponse;
};

export const updateCardById = async (cardData: CardFormData, id: number) => {
	const response = await fetch(`${baseUrl}/cards/${id}`, {
		method: "PATCH",
		body: JSON.stringify(cardData),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Unable to edit card");
	}

	const card = await response.json();
	return card as CardResponse;
};

export const archiveCardById = async (id: number) => {
	const response = await fetch(`${baseUrl}/cards/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Unable to delete card");
	}

	const deletedCard = await response.json();
	return deletedCard as CardResponse;
};
