import styles from "./Header.module.scss";

const Header = () => {
	return (
		<div className={styles.header}>
			<img
				className={styles.header__content}
				src="/todo-hero.png"
				alt="Organise your life"
			/>
		</div>
	);
};
export default Header;
