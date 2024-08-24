import { useState } from "react";
import { CardFetchResponse } from "../../types/card";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";
import { toStatusEnum } from "../../utils/status-utils";
import { deleteCardById, updateCardById } from "../../services/card-services";
import { CardFormData } from "../CardForm/schema";

interface CardProps {
	card: CardFetchResponse;
}

const Card = ({ card }: CardProps) => {
	const [showEditCardModal, setShowEditCardModal] = useState(false);

	const onSubmit = async (data: CardFormData) => {
		await updateCardById(data, card.id)
			.then(() => setShowEditCardModal(false))
			.catch(e => console.error(e.message));
	};

	const handleArchive = async () => {
		await deleteCardById(card.id)
			.then(() => setShowEditCardModal(false))
			.catch(e => console.error(e));
	};

	return (
		<>
			<div>
				<h5>{card.description}</h5>
				<p>Category: {card.category.name}</p>
				<button onClick={() => setShowEditCardModal(true)}>Edit</button>
			</div>

			{showEditCardModal && (
				<Modal handleModal={setShowEditCardModal}>
					<CardForm
						formType="EDIT"
						defaultValues={{
							description: card.description,
							categoryId: card.category.id,
							status: toStatusEnum(card.status),
							isArchived: card.archived,
						}}
						onSubmit={onSubmit}
						handleArchive={handleArchive}
					/>
				</Modal>
			)}
		</>
	);
};

export default Card;
