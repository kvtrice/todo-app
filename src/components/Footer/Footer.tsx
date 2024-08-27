import styles from "./Footer.module.scss";

const Footer = () => {
	return (
		<div className={styles.footer}>
			<p className={styles.footer__content}>
				Made with ❤️ by <a href="https://github.com/kvtrice">Kat</a>
			</p>
		</div>
	);
};
export default Footer;
