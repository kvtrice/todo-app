import { useState } from "react";
import { CardFetchResponse } from "../../types/card";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";
import { toStatusEnum } from "../../utils/status-utils";
import {
	archiveCardById,
	createCard,
	getAllCards,
	updateCardById,
} from "../../services/card-services";
import { CardFormData } from "../CardForm/schema";
import styles from "./Card.module.scss";
import useCardContext from "../../hooks/useCardContext";
import { HiOutlineDuplicate } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { duplicateCard, getTagColour } from "../../utils/card-utils";

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
			await archiveCardById(card.id);
			const updatedCards = await getAllCards();
			setCards(updatedCards);
			setShowEditCardModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDuplicate = async () => {
		try {
			const cardToDuplicate = duplicateCard(card);
			await createCard(cardToDuplicate);
			const updatedCards = await getAllCards();
			setCards(updatedCards);
		} catch (err) {
			console.log(err);
		}
	};

	const tagColor = getTagColour(card);

	return (
		<>
			<div className={styles.card}>
				<div className={styles.card__main}>
					<div className={styles.card__main__tags}>
						<span
							className={`${styles.card__main__tags__category} ${styles[tagColor]}
							`}
						>
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
					<Modal
						handleModal={setShowEditCardModal}
						title="Edit card"
					>
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
							archiveStatus={card.archived}
						/>
					</Modal>
				)}
			</div>
		</>
	);
};

export default Card;
