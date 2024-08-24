import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ToDoMain from "./components/ToDoMain/ToDoMain";
import CardContextProvider from "./contexts/CardContextProvider";
import CategoryContextProvider from "./contexts/CategoryContextProvider";

function App() {
	return (
		<>
			<Header />
			<CategoryContextProvider>
				<CardContextProvider>
					<ToDoMain />
				</CardContextProvider>
			</CategoryContextProvider>
			<Footer />
		</>
	);
}

export default App;
