import { useState } from "react";
import styles from "./StatusList.module.scss";
import Modal from "../Modal/Modal";
import CardForm from "../CardForm/CardForm";

interface StatusListProps {
	title: string;
	status: string;
}

const StatusList = ({ title, status }: StatusListProps) => {
	const [showAddNewCardModal, setAddNewCardModal] = useState<boolean>(false);

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
						onSubmit={() => {}}
						defaultValues={{ status: status }}
					/>
				</Modal>
			)}
		</>
	);
};

export default StatusList;
