import { CardFormData } from "../components/CardForm/schema";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface CardResponse {
	id: number;
	description: string;
	status: string;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
	isArchived: boolean;
}

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
	return cards as CardResponse[];
};

export const getCardsByCategory = async (category: string) => {
	const response = await fetch(`${baseUrl}/cards?category=${category}`);

	if (!response.ok) {
		throw new Error("Unable to fetch cards");
	}

	const cards = await response.json();
	return cards as CardResponse[];
};

export const getCardById = async (id: number) => {
	const response = await fetch(`${baseUrl}/cards/${id}`);

	if (!response.ok) {
		throw new Error("Unable to find card");
	}

	const card = await response.json();
	return card as CardResponse;
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

export const deleteCardById = async (id: number) => {
	const response = await fetch(`${baseUrl}/cards/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Unable to delete card");
	}

	const deletedCard = await response.json();
	return deletedCard as CardResponse;
};
