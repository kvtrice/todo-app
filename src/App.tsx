import ToDoMain from "./components/ToDoMain/ToDoMain";
import CardContextProvider from "./contexts/CardContextProvider";
import CategoryContextProvider from "./contexts/CategoryContextProvider";
import CardFilterContextProvider from "./contexts/CardFilterContextProvider";
import Layout from "./components/Layout/Layout";

function App() {
	return (
		<CardContextProvider>
			<CategoryContextProvider>
				<CardFilterContextProvider>
					<Layout>
						<ToDoMain />
					</Layout>
				</CardFilterContextProvider>
			</CategoryContextProvider>
		</CardContextProvider>
	);
}

export default App;
