import useButtonLoadingStateContext from "../../hooks/useButtonLoadingStateContext";
import { FormType } from "../CardForm/CardForm";
import styles from "./ModalButtons.module.scss";
import { TailSpin } from "react-loading-icons";

interface ModalButtonsProps {
	onArchive?: () => unknown;
	formType?: FormType;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	archiveStatus?: boolean | undefined;
}

const ModalButtons = ({
	onArchive,
	formType,
	setModal,
	archiveStatus,
}: ModalButtonsProps) => {
	const { isArchiveLoading, isSaveLoading } = useButtonLoadingStateContext();

	return (
		<div className={styles.buttons}>
			<div className={styles.buttons__left}>
				{formType === "EDIT" && onArchive && (
					<button
						className={styles.buttons__left__archive}
						type="button"
						disabled={isArchiveLoading}
						onClick={() => {
							onArchive();
						}}
					>
						{isArchiveLoading ? (
							<TailSpin
								height={10}
								width={45}
								stroke="#000000"
								strokeWidth={8}
							/>
						) : archiveStatus === true ? (
							"Restore"
						) : (
							"Archive"
						)}
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
					disabled={isSaveLoading}
				>
					{isSaveLoading ? (
						<TailSpin
							height={10}
							width={30}
							stroke="#000000"
							strokeWidth={8}
						/>
					) : (
						"Save"
					)}
				</button>
			</div>
		</div>
	);
};

export default ModalButtons;
