import { Box, Button, FormControl, Input, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { nanoid } from 'nanoid'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { RootState } from '../../store/store'
import { IExercise } from '../../Types/app'
import { ReactSelectC } from './ReactSelect'

import { FormHelperText } from '@mui/material'
export type TData = {
	title: string
	text: string
	priority: 'noMatter' | 'important' | 'veryImportant'
}

type PopupClick = MouseEvent & {
	path: Node[]
}
type TProps = {
	headerRef: React.MutableRefObject<null>
}

export const CreationTasks: React.FC<TProps> = ({ headerRef }) => {
	const submit: SubmitHandler<TData> = ({ title, text, priority }) => {
		const exercise: IExercise = {
			id: nanoid(),
			title,
			text,
			priority,
			comments: [],
		}

		createTask(exercise)

		createMod(false)

		reset()
	}

	const {
		reset,
		register,
		handleSubmit,

		control,
		formState: { errors },
	} = useForm<TData>({
		mode: 'onSubmit',
	})

	const formRef = React.useRef(null)

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const _event = event as PopupClick

			if (
				headerRef.current &&
				formRef.current &&
				!_event.composedPath().includes(formRef.current) &&
				!_event.composedPath().includes(headerRef.current)
			) {
				createMod(false)
			}
		}

		document.body.addEventListener('click', handleClickOutside)

		return () => {
			document.body.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const { isCreating } = useSelector((state: RootState) => state.task)

	const { createTask, createMod } = useActions()
	return (
		<>
			{isCreating && (
				<>
					<div className='wrapper-MOD'></div>
					<Box
						sx={{
							position: 'absolute',

							width: '100%',
							maxHeight: '540px',
							display: 'flex',

							flexDirection: 'column',
							borderRadius: 2,
							left: '50%',
							top: '50%',
							gap: 1,
							transform: 'translate(-50%, -70%)',
						}}
					>
						<form onSubmit={handleSubmit(submit)}>
							<Box
								ref={formRef}
								sx={{
									boxShadow: '-5px -5px 5px -5px  rgba(0, 139, 246, 0.6)',
									padding: '20px 20px',
									borderRadius: 4,
									bgcolor: 'background.default',
									margin: '0 auto',
									maxWidth: '400px',
									display: 'flex',
									flexDirection: 'column',
									gap: 1,
								}}
							>
								<Typography
									variant='h4'
									component='h2'
									sx={{
										textAlign: 'center',
										color: 'primary.main',
										p: '5px 0',
										borderRadius: '5px',
									}}
								>
									Создай задание
								</Typography>

								<FormControl error={Boolean(errors?.title)}>
									<InputLabel htmlFor='title'>Название</InputLabel>
									<OutlinedInput
										id='title'
										{...register('title', {
											required: 'Нету названия 🤪',
											minLength: {
												value: 5,
												message: 'Минимум 5 символов)',
											},
											maxLength: {
												value: 20,
												message: 'Максимум 20 символов)',
											},
										})}
										label='Название'
										fullWidth
										aria-describedby='title-error'
									/>
									{errors?.title ? (
										<FormHelperText id='title-error'>
											{errors?.title?.message || 'Ошибка'}
										</FormHelperText>
									) : (
										<FormHelperText> </FormHelperText>
									)}
								</FormControl>

								<FormControl error={Boolean(errors?.text)}>
									<InputLabel htmlFor='component-outlined'>Описание</InputLabel>
									<OutlinedInput
										id='component-outlined'
										{...register('text', {
											required: 'Заполни 😉',
											minLength: {
												value: 5,
												message: 'Минимум 5 символов)',
											},

											maxLength: {
												value: 150,
												message: 'Максимум 150 символов)',
											},
										})}
										multiline
										label='Описание'
										rows={4}
										fullWidth
										aria-describedby='component-error-text'
									/>
									{errors?.text ? (
										<FormHelperText id='component-error-text'>
											{errors?.text?.message || 'Ошибка'}
										</FormHelperText>
									) : (
										<FormHelperText> </FormHelperText>
									)}
								</FormControl>

								<FormControl error={Boolean(errors?.priority)}>
									<ReactSelectC control={control} />
									{errors?.priority ? (
										<FormHelperText>Надо выбрать 🤭</FormHelperText>
									) : (
										<FormHelperText> </FormHelperText>
									)}
								</FormControl>

								<Button variant='contained' type='submit'>
									Добавить
								</Button>
								<Button
									onClick={() => createMod(false)}
									variant='contained'
									color='success'
									fullWidth
								>
									Назад
								</Button>
							</Box>
						</form>
					</Box>
				</>
			)}
		</>
	)
}
