import { useState } from "react";
import { CardFetchResponse } from "../../types/card";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";
import { toStatusEnum } from "../../utils/status-utils";
import {
	deleteCardById,
	getAllCards,
	updateCardById,
} from "../../services/card-services";
import { CardFormData } from "../CardForm/schema";
import styles from "./Card.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import useCardContext from "../../hooks/useCardContext";

interface CardProps {
	card: CardFetchResponse;
}

const Card = ({ card }: CardProps) => {
	const [showEditCardModal, setShowEditCardModal] = useState(false);
	const { setCards } = useCardContext();

	const onSubmit = async (data: CardFormData) => {
		try {
			await updateCardById(data, card.id);
			const updatedCards = await getAllCards();
			setCards(updatedCards);
			setShowEditCardModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleArchive = async () => {
		try {
			await deleteCardById(card.id);
			const updatedCards = await getAllCards();
			setCards(updatedCards);
			setShowEditCardModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className={styles.card}>
				<div className={styles.card__main}>
					<div className={styles.card__main__category}>
						<p className={styles.card__main__category__content}>
							{card.category.name}
						</p>
					</div>

					<div className={styles.card__description}>
						<p>{card.description}</p>
					</div>
				</div>
				<div className={styles.card__editButton}>
					<MdOutlineEdit
						size={20}
						className={styles.card__editButton__icon}
						onClick={() => setShowEditCardModal(true)}
					/>
				</div>
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
