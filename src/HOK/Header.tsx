import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'

const navItems: string[] = [
	'Создать задание',
	'Активные задания',
	'Выполненые задания',
	'Корзина',
]

type TProps = {
	headerRef: React.MutableRefObject<null>
}



export const Header: React.FC<TProps> = ({ headerRef }) => {
	const navClick = (name: string): void => {
		switch (name) {
			case 'Создать задание':
				createMod(true)
				break
			case 'Активные задания':
				navigate('/')
				break
			case 'Выполненые задания':
				navigate('/completed')
				break
			case 'Корзина':
				navigate('/deleted')
				break

			default:
				break
		}
	}

	const navigate = useNavigate()
	const { createMod } = useActions()

	return (
		<header className='App-header'>
			<Box
				ref={headerRef}
				sx={{
					bgcolor: 'background.default',
					borderRadius: 3,
					p: ' 40px 10px',
					display: 'flex',
					flexDirection: 'column',
					gap: 5,
				}}
			>
				{navItems.map(item => (
					<Button
						key={item}
						sx={{ color: '#fff', fontSize: '14px' }}
						onClick={() => navClick(item)}
					>
						{item}
					</Button>
				))}
			</Box>
		</header>
	)
}
