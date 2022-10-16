import { Container, createTheme, Paper, ThemeProvider } from '@mui/material'
import React from 'react'





type TProps = {
	className?: string
	children: React.ReactNode[]
}

export const Wrapper: React.FC<TProps> = ({children}) => {
	return (
		<Paper>
			<Container  maxWidth='lg' sx={{ overflow: 'hidden' }}>
				<div className='App'>{children}</div>
			</Container>
		</Paper>
	)
}
