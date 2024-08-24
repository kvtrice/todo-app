import { Status } from "../components/CardForm/schema";

export const toStatusEnum = (status: string): Status | undefined => {
	switch (status) {
		case "TODO":
			return Status.TODO;
		case "INPROGRESS":
			return Status.INPROGRESS;
		case "DONE":
			return Status.DONE;
		default:
			return undefined;
	}
};
