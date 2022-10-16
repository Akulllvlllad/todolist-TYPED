import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { IExercise } from '../../Types/app'
import { EmptyTask } from '../EmptyTask'
import { Comments } from './Comments'
import { Content } from './Content'



export const ListCard: React.FC = () => {
	const activeTasks = useSelector((state: RootState) => state.task.activeTask)
	return (
		<Box
			sx={{
				bgcolor: 'background.default',
				borderRadius: 3,
				p: 1,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<Typography
				variant='h4'
				component='h2'
				sx={{
					textAlign: 'center',
					bgcolor: 'background.default',
					p: '10px 0',
					borderRadius: '5px',
				}}
			>
				Активные задания
			</Typography>
			{activeTasks.length > 0 ? (
				<Box
					sx={{
						minHeight: '80vh',
						bgcolor: 'background.default',

						borderRadius: '5px',
					}}
				>
					{activeTasks.map((obj, i) => (
						<TaskCard key={obj.id} {...obj} />
					))}
				</Box>
			) : (
				<EmptyTask />
			)}
		</Box>
	)
}

export const TaskCard: React.FC<IExercise> = ({
	id,
	title,
	text,
	priority,
	comments,
}) => {
	const [isVisible, setVisible] = React.useState(false)
	return (
		<Box
			sx={{
				border: '1px solid white',
				minWidth: 220,
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<Content id={id} title={title} priority={priority} text={text} />

			{isVisible ? (
				<Comments comments={comments} />
			) : (
				<Button onClick={() => setVisible(true)}> Мои комментарии</Button>
			)}
		</Box>
	)
}
