import { useState } from "react";
import { CardFetchResponse } from "../../types/card";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";
import { toStatusEnum } from "../../utils/status-utils";
import { deleteCardById, updateCardById } from "../../services/card-services";
import { CardFormData } from "../CardForm/schema";
import styles from "./Card.module.scss";
import { MdOutlineEdit } from "react-icons/md";

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
