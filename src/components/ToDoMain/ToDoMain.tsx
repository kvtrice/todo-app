import FilterBar from "../FilterBar/FilterBar";
import StatusLists from "../StatusLists/StatusLists";
import styles from "./ToDoMain.module.scss";

const ToDoMain = () => {
	return (
		<div className={styles.main}>
			<FilterBar />
			<StatusLists />
		</div>
	);
};

export default ToDoMain;
