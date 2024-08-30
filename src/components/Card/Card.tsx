import { useState } from "react";
import { CardFetchResponse } from "../../types/card";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";
import { toStatusEnum } from "../../utils/status-utils";
import {
	createCard,
	deleteCardById,
	getAllCards,
	updateCardById,
} from "../../services/card-services";
import { CardFormData, Status } from "../CardForm/schema";
import styles from "./Card.module.scss";
import useCardContext from "../../hooks/useCardContext";
import { HiOutlineDuplicate } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { STATUS_OPTIONS } from "../../constants/data";

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

	const onArchive = async () => {
		try {
			await deleteCardById(card.id);
			const updatedCards = await getAllCards();
			setCards(updatedCards);
			setShowEditCardModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDuplicate = async () => {
		try {
			const cardStatus = STATUS_OPTIONS.filter(
				status => status.value === card.status
			);

			const cardToDuplicate = {
				description: card.description + " (copy)",
				categoryId: card.category.id,
				isArchived: card.archived,
				status: cardStatus[0].value,
			};

			await createCard(cardToDuplicate);
			const updatedCards = await getAllCards();
			setCards(updatedCards);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className={styles.card}>
				<div className={styles.card__main}>
					<div className={styles.card__main__tags}>
						<span className={styles.card__main__tags__category}>
							{card.category.name}
						</span>
						{card.archived && (
							<span className={styles.card__main__tags__archived}>
								Archived
							</span>
						)}
					</div>

					<div className={styles.card__description}>
						<p>{card.description}</p>
					</div>
				</div>
				<div className={styles.card__actionButtons}>
					<HiOutlineDuplicate
						size={22}
						className={styles.card__actionButtons__duplicate}
						onClick={handleDuplicate}
					/>
					<TbEdit
						size={22}
						className={styles.card__actionButtons__edit}
						onClick={() => setShowEditCardModal(true)}
					/>
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
							setModal={setShowEditCardModal}
							onSubmit={onSubmit}
							onArchive={onArchive}
						/>
					</Modal>
				)}
			</div>
		</>
	);
};

export default Card;
