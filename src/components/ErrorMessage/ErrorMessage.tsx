import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
	error: string | undefined;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
	return <small className={styles.error}>{error}</small>;
};

export default ErrorMessage;
