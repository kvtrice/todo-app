import styles from "./Modal.module.scss";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
	children: React.ReactNode;
	handleModal: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
}

const Modal = ({ children, handleModal, title }: ModalProps) => {
	const closeModal = () => handleModal(false);

	return (
		<div>
			<div className={styles.modal__container}>
				<div className={styles.modal}>
					<div className={styles.modal__header}>
						<div className={styles.modal__header__title}>
							{title}
						</div>
						<div
							className={styles.modal__header__close}
							onClick={closeModal}
						>
							<IoCloseOutline size={22} />
						</div>
					</div>
					<div className={styles.modal__content}>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
