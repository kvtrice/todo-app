import { FormType } from "../CardForm/CardForm";
import styles from "./ModalButtons.module.scss";

interface ModalButtonsProps {
	onArchive?: () => unknown;
	formType?: FormType;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	archiveStatus: boolean;
}

const ModalButtons = ({
	onArchive,
	formType,
	setModal,
	archiveStatus,
}: ModalButtonsProps) => {
	return (
		<div className={styles.buttons}>
			<div className={styles.buttons__left}>
				{formType === "EDIT" && onArchive && (
					<button
						className={styles.buttons__left__archive}
						type="button"
						onClick={() => onArchive()}
					>
						{archiveStatus === true ? "Restore" : "Archive"}
					</button>
				)}
			</div>
			<div className={styles.buttons__right}>
				<button
					className={styles.buttons__right__cancel}
					onClick={e => {
						e.preventDefault();
						setModal(false);
					}}
				>
					Cancel
				</button>
				<button
					type="submit"
					className={styles.buttons__right__submit}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default ModalButtons;
