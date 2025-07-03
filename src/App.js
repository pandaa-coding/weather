import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './Components/views/Home.view';
import SearchView from './Components/views/Search.view';
import NotFoundView from './Components/views/NotFound.view';


function App() {

	return (<>
		<BrowserRouter basename='/weather'>
			<Routes>
				<Route path='/' element={<HomeView />} />
				<Route path='/search/:text' element={<SearchView />} />
				<Route path='*' element={<NotFoundView />} />
			</Routes>
		</BrowserRouter>
	</>);
}

export default App;
