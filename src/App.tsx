import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ToDoMain from "./components/ToDoMain/ToDoMain";
import CategoryContextProvider from "./contexts/CategoryContextProvider";

function App() {
	return (
		<>
			<Header />
			<CategoryContextProvider>
				<ToDoMain />
			</CategoryContextProvider>
			<Footer />
		</>
	);
}

export default App;
