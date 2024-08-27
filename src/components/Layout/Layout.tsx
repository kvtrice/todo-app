import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";

interface LayoutType {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutType) => {
	return (
		<div className={styles.layout}>
			<div className={styles.layout__main}>
				<Header />
				{children}
			</div>
			<Footer />
		</div>
	);
};
export default Layout;
