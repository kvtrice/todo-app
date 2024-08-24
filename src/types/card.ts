export interface CardResponse {
	id: number;
	description: string;
	status: string;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
	isArchived: boolean;
}

export interface CardFetchResponse {
	id: number;
	createdAt: string;
	updatedAt: string;
	description: string;
	category: {
		id: number;
		createdAt: string;
		updatedAt: string;
		name: string;
	};
	status: string;
	archived: boolean;
}
