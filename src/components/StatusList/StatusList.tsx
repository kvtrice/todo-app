import { useState } from "react";
import styles from "./StatusList.module.scss";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";
import { CardFormData, Status } from "../CardForm/schema";
import { createCard, getAllCards } from "../../services/card-services";
import Card from "../Card/Card";
import useCardContext from "../../hooks/useCardContext";
import useCardFilterContext from "../../hooks/useCardFilterContext";

interface StatusListProps {
	title: string;
	status: Status;
}

const StatusList = ({ title, status }: StatusListProps) => {
	const [showAddNewCardModal, setAddNewCardModal] = useState<boolean>(false);
	const { cards, setCards } = useCardContext();
	const { categoryFilter, showArchived } = useCardFilterContext();

	let filteredCards = cards.filter(card => card.status === status);

	if (!showArchived) {
		filteredCards = filteredCards.filter(card => card.archived === false);
	}

	if (categoryFilter !== "all" && categoryFilter !== "") {
		filteredCards = filteredCards.filter(
			card => card.category.name === categoryFilter
		);
	}

	const onSubmit = async (data: CardFormData) => {
		try {
			await createCard(data);
			const updatedCards = await getAllCards();
			setCards(updatedCards);
			setAddNewCardModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className={styles.statusList}>
				<h2 className={styles.statusList__heading}>{title}</h2>
				<div className={styles.cardContainer}>
					{cards &&
						filteredCards.map(card => (
							<Card
								key={card.id}
								card={card}
							/>
						))}
				</div>
				<button
					className={styles.statusList__newCardButton}
					onClick={() => setAddNewCardModal(true)}
				>
					Add New Card
				</button>

				{showAddNewCardModal && (
					<Modal handleModal={setAddNewCardModal}>
						<CardForm
							onSubmit={onSubmit}
							defaultValues={{ status: status }}
							setModal={setAddNewCardModal}
						/>
					</Modal>
				)}
			</div>
		</>
	);
};

export default StatusList;
