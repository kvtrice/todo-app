import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ToDoMain from "./components/ToDoMain/ToDoMain";
import CardContextProvider from "./contexts/CardContextProvider";
import CategoryContextProvider from "./contexts/CategoryContextProvider";
import CardFilterContextProvider from "./contexts/CardFilterContextProvider";

function App() {
	return (
		<>
			<Header />
			<CategoryContextProvider>
				<CardContextProvider>
					<CardFilterContextProvider>
						<ToDoMain />
					</CardFilterContextProvider>
				</CardContextProvider>
			</CategoryContextProvider>
			<Footer />
		</>
	);
}

export default App;
