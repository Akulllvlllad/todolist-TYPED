import React from 'react'
import { ListCard } from './components/ListCard'
import { Box } from '@mui/system'
import { Route, Routes } from 'react-router-dom'
import { CreationTasks } from './components/СreationTasks'
import { CompletedTasks } from './components/CompletedTasks'
import { Wrapper } from './HOK/Wrapper'
import { Main } from './HOK/Main'
import { Header } from './HOK/Header'
import { Alerts } from './components/Alerts/Alerts'
import { DeletedTask } from './components/DeletedCard'







function App() {
	const headerRef = React.useRef(null)
	
	
	return (
		<>
			<Wrapper>
				<Header headerRef={headerRef} />

				<Main>
					<Routes>
						<Route path='/' element={<ListCard />} />
						<Route path='/completed' element={<CompletedTasks />} />
						<Route path='/deleted' element={<DeletedTask/>} />
						<Route path='/*' element={<h1>ОШИБКА</h1>} />
					</Routes>
				</Main>

				<footer className='App-footer'></footer>
			</Wrapper>
			<CreationTasks headerRef={headerRef} />
			<Alerts />
			
		</>
	)
}

export default App
