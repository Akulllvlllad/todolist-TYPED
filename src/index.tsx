import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/app.scss'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {  createTheme,  ThemeProvider } from '@mui/material'
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
