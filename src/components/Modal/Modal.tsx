import styles from "./Modal.module.scss";

interface ModalProps {
	children: React.ReactNode;
	handleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, handleModal }: ModalProps) => {
	const closeModal = () => {
		handleModal(false);
	};

	return (
		<div>
			<div className={styles.modal__container}>
				<div className={styles.modal}>
					<div className={styles.modal__header}>
						<p
							className={styles.modal__header__close}
							onClick={closeModal}
						>
							&times;
						</p>
					</div>
					<div className={styles.modal__content}>{children}</div>
					<div className={styles.modal__footer}>
						<button
							className={styles.modal__footer__btn}
							onClick={closeModal}
						>
							Cancel
						</button>
						<button>Save</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
