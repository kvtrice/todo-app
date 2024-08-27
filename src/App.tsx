import ToDoMain from "./components/ToDoMain/ToDoMain";
import CardContextProvider from "./contexts/CardContextProvider";
import CategoryContextProvider from "./contexts/CategoryContextProvider";
import CardFilterContextProvider from "./contexts/CardFilterContextProvider";
import Layout from "./components/Layout/Layout";

function App() {
	return (
		<CategoryContextProvider>
			<CardContextProvider>
				<CardFilterContextProvider>
					<Layout>
						<ToDoMain />
					</Layout>
				</CardFilterContextProvider>
			</CardContextProvider>
		</CategoryContextProvider>
	);
}

export default App;
