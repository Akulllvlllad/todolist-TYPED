import React from 'react'
import {
	Box,
	Button,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import { IExercise } from '../../Types/app'
import { useActions } from '../../hooks/useActions'

type TProps = {
	id: string
	title: string
	priority: string
	text: string
}


export const Content: React.FC<TProps> = ({
	id,
	title,
	priority,
	text,
	
}) => {

	const { executeTask, deleteTask } = useActions()

	const removeTaskCard = () => {
		deleteTask(id)
	}

	const сompleteTaskCard = () => {
		 executeTask(id)
	}
	return (
		<CardContent>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 2,
					overflow: 'hidden',
				}}
			>
				<Typography
					variant='h5'
					sx={{ textDecoration: 'underline', hyphens: 'auto' }}
				>
					{title}
				</Typography>
				<Typography color='text.secondary'>{priority}</Typography>
			</Box>

			<Typography
				sx={{
					hyphens: 'auto',
					wordWrap: 'break-word',
					overflowWrap: 'break-word',
				}}
			>
				{text}
			</Typography>
			


			<CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='contained' color='success' onClick={сompleteTaskCard}>
					Done!
				</Button>
				<Button variant='outlined' color='error' onClick={removeTaskCard}>
					DELETE😑
				</Button>
			</CardActions>
		</CardContent>
	)
}
