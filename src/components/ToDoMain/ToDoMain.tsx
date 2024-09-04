import { useEffect, useState } from "react";
import useCardContext from "../../hooks/useCardContext";
import FilterBar from "../FilterBar/FilterBar";
import StatusLists from "../StatusLists/StatusLists";
import styles from "./ToDoMain.module.scss";
import { TailSpin } from "react-loading-icons";
import ButtonLoadingStateContextProvider from "../../contexts/ButtonLoadingStateContextProvider";

const ToDoMain = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { cards } = useCardContext();

	useEffect(() => {
		if (cards.length > 0) {
			setIsLoading(false);
		}
	}, [cards]);

	const refreshPage = () => {
		window.location.reload();
	};

	return (
		<>
			{isLoading && (
				<div className={styles.loading}>
					<div className={styles.loading__spinner}>
						<TailSpin
							height={100}
							width={100}
						/>
					</div>
					<p className={styles.loading__text}>
						The app may take a moment to load, thank you for your
						patience.
					</p>
					<div className={styles.loading__refresh}>
						<p className={styles.loading__refresh__text}>
							Feels like it's taking a little too long? Try
							refreshing here:{" "}
						</p>
						<button
							className={styles.loading__refresh__btn}
							onClick={refreshPage}
						>
							Refresh
						</button>
					</div>
				</div>
			)}
			{!isLoading && (
				<div className={styles.main}>
					<ButtonLoadingStateContextProvider>
						<FilterBar />
						<StatusLists />
					</ButtonLoadingStateContextProvider>
				</div>
			)}
		</>
	);
};

export default ToDoMain;
