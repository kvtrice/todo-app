import { STATUS_OPTIONS } from "../../constants/data";
import StatusList from "../StatusList/StatusList";
import styles from "./StatusLists.module.scss";

const StatusLists = () => {
	return (
		<div className={styles.statusListsWrapper}>
			{STATUS_OPTIONS.map(status => (
				<StatusList
					key={status.value}
					title={status.label}
					status={status.value}
				/>
			))}
		</div>
	);
};

export default StatusLists;
