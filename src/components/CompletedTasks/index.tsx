import { Box, Button, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { IComment, IExercise } from '../../Types/app'
import { EmptyTask } from '../EmptyTask'

export const CompletedTasks: React.FC = () => {
	const { doneTask } = useSelector((store: RootState) => store.task)
	
	
	return (
		<>
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
					Выполненые задания
				</Typography>
				{doneTask.length > 0 ? (
					<Box sx={{ minHeight: '80vh', borderRadius: '5px', p: 1 }}>
						{doneTask.map((obj, i) => (
							<TaskCard key={obj.id} {...obj} />
						))}
					</Box>
				) : (
					<EmptyTask />
				)}
			</Box>
		</>
	)
}


export const TaskCard: React.FC<IExercise> = ({
	id,
	title,
	text,
	priority,
	comments,
}) => {
	
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
			<Comments comments={comments} />
		</Box>
	)
}


type TProps = {
	id: string
	title: string
	priority: string
	text: string
}

export const Content: React.FC<TProps> = ({ id, title, priority, text }) => {
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
			
		</CardContent>
	)
}

type TPropsС = {
	comments: IComment[]
}

 const Comments: React.FC<TPropsС> = ({ comments }) => {
	
	return (
		<Box
			sx={{
				p: 2,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					mb: '40px',
				}}
			>
			

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					{Boolean(comments.length === 0) && (
						<Typography component='p' sx={{ wordWrap: 'break-word' }}>
							Комментариев  нет
						</Typography>
					)}
					{comments.map(comment => (
						<Typography
							component='p'
							key={comment.id}
							align='left'
							sx={{
								hyphens: 'auto',
								position: 'relative',
								p: '0 40px 0 0',
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
							}}
						>
							{comment.text}
							
						</Typography>
					))}
				</Box>
			</Box>

			
		</Box>
	)
}