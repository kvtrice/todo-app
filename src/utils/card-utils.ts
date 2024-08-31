import { STATUS_OPTIONS, TAG_COLOURS } from "../constants/data";
import useCategoryContext from "../hooks/useCategoryContext";
import { CardFetchResponse } from "../types/card";

export const duplicateCard = (card: CardFetchResponse) => {
	const cardStatus = STATUS_OPTIONS.filter(
		status => status.value === card.status
	);

	return {
		description: card.description + " (copy)",
		categoryId: card.category.id,
		isArchived: card.archived,
		status: cardStatus[0].value,
	};
};

export const getTagColour = (card: CardFetchResponse) => {
	const { categories } = useCategoryContext();

	const categoryIndex = categories.findIndex(
		category => category.name === card.category.name
	);

	const colourIndex = categoryIndex % TAG_COLOURS.length;

	return TAG_COLOURS[colourIndex];
};
