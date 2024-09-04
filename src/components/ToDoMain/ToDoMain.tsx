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

	return (
		<>
			{isLoading && (
				<div className={styles.loading}>
					<TailSpin
						height={100}
						width={100}
					/>
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
