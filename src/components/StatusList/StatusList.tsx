import { useState } from "react";
import styles from "./StatusList.module.scss";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";
import { CardFormData, Status } from "../CardForm/schema";
import { createCard } from "../../services/card-services";

interface StatusListProps {
	title: string;
	status: Status;
}

const StatusList = ({ title, status }: StatusListProps) => {
	const [showAddNewCardModal, setAddNewCardModal] = useState<boolean>(false);

	const onSubmit = async (data: CardFormData) => {
		await createCard(data)
			.then(data => console.log("Success!", data))
			.catch(e => console.error("Error", e));
	};

	return (
		<>
			<div className={styles.statusList}>
				<h1>{title}</h1>
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
