import useCardContext from "../../hooks/useCardContext";
import FilterBar from "../FilterBar/FilterBar";
import StatusLists from "../StatusLists/StatusLists";
import styles from "./ToDoMain.module.scss";

const ToDoMain = () => {
	const { cards } = useCardContext();

	return (
		<div className={styles.main}>
			<FilterBar />
			<StatusLists />
		</div>
	);
};

export default ToDoMain;
