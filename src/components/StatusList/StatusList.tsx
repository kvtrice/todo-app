import { useContext, useState } from "react";
import styles from "./StatusList.module.scss";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";
import { CardFormData, Status } from "../CardForm/schema";
import { createCard } from "../../services/card-services";
import { CardContext } from "../../contexts/CardContextProvider";
import Card from "../Card/Card";

interface StatusListProps {
	title: string;
	status: Status;
}

const StatusList = ({ title, status }: StatusListProps) => {
	const [showAddNewCardModal, setAddNewCardModal] = useState<boolean>(false);
	const cardContext = useContext(CardContext);

	if (!cardContext) {
		throw new Error("Unable to find card context");
	}

	const { cards } = cardContext;

	const filteredCardsByStatus = cards.filter(card => card.status === status);
	const filteredCardsByArchived = filteredCardsByStatus.filter(
		card => card.archived === false
	);

	const onSubmit = async (data: CardFormData) => {
		await createCard(data)
			.then(() => setAddNewCardModal(false))
			.catch(e => console.error(e.message));
	};

	return (
		<>
			<div className={styles.statusList}>
				<h1>{title}</h1>
				{cards &&
					filteredCardsByArchived.map(card => (
						<Card
							key={card.id}
							card={card}
						/>
					))}
				<button onClick={() => setAddNewCardModal(true)}>
					Add New Card
				</button>
			</div>

			{showAddNewCardModal && (
				<Modal handleModal={setAddNewCardModal}>
					<CardForm
						onSubmit={onSubmit}
						defaultValues={{ status: status }}
					/>
				</Modal>
			)}
		</>
	);
};

export default StatusList;
