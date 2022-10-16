import React from 'react'
import { Box, Button, FormControl, FormHelperText, IconButton, TextField, Typography } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { IComment, TCommentText } from '../../Types/app'
import { useActions } from '../../hooks/useActions'
import DeleteIcon from '@mui/icons-material/Delete'
import { Container } from '@mui/system'
type TProps = {
	comments: IComment[]
}

export const Comments: React.FC<TProps> = ({ comments }) => {
	const [isVisible, setVisible] = React.useState(false)
	const {
		reset,
		register,
		handleSubmit,

		formState: { errors },
	} = useForm<TCommentText>({
		mode: 'onSubmit',
	})
	const { addComment } = useActions()

	const submit: SubmitHandler<TCommentText> = data => {
		const comment: IComment = {
			id: nanoid(),
			text: data.text,
		}
		addComment(comment)
		setVisible(false)
		reset()
	}
	const { deleteComment } = useActions()

	const deleteComments = (id: string) => {
		deleteComment(id)
	}
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
				<Typography variant='h6' color='text.secondary'>
					Комментарии
				</Typography>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					{Boolean(comments.length === 0) && (
						<Typography component='p' sx={{ wordWrap: 'break-word' }}>
							Комментариев еще нет😒
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
							<IconButton
								onClick={() => deleteComments(comment.id)}
								sx={{ position: 'absolute', right: 0, top: 0, p: 0.3 }}
								color='error'
								size='large'
								aria-label='show 4 new mails'
							>
								<DeleteIcon />
							</IconButton>
						</Typography>
					))}
				</Box>
			</Box>

			{isVisible && (
				<Box>
					<form onSubmit={handleSubmit(submit)}>
						<TextField
							error={Boolean(errors?.text)}
							{...register('text', {
								required: 'Текст отсутсвует',
								minLength: {
									value: 5,
									message: 'Минимум 5 символов)',
								},

								maxLength: {
									value: 100,
									message: 'Максимум 100 символов)',
								},
							})}
							label='Комментарий'
							multiline
							rows={4}
							fullWidth
						/>
						{errors?.text ? (
							<FormHelperText error>
								{errors?.text?.message || 'Ошибка'}
							</FormHelperText>
						) : (
							<FormHelperText> </FormHelperText>
						)}

						<Button type='submit' fullWidth color='success'>
							Отправить
						</Button>
					</form>
				</Box>
			)}

			<Button onClick={() => setVisible(prev => !prev)} fullWidth>
				{isVisible ? 'Не комментировать' : 'Комментировать'}
			</Button>
		</Box>
	)
}
