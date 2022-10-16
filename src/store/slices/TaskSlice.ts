import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { IInitialState } from '../../Types/app'

const initialState: IInitialState = {
	activeTask: JSON.parse(localStorage.getItem('activeTask') as string) || [
		{
			id: nanoid(),
			title: 'Важное дело!',
			text: 'Первая задача - удалить этот пост:)',
			priority: 'veryImportant',
			comments: [{ id: nanoid(), text: 'Это первый комментарий' }],
		},
	],
	deletedTask: JSON.parse(localStorage.getItem('deletedTask') as string) || [],
	doneTask: JSON.parse(localStorage.getItem('doneTask') as string) || [],
	isCreating: false,
	isAlert: null,
}

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		createMod: (state, action) => {
			state.isCreating = action.payload
		},
		createTask: (state, action) => {
			if (window.confirm('Создать задание?')) {
			state.isAlert = 'info'

			state.activeTask = [action.payload, ...state.activeTask]

			localStorage.setItem('activeTask', JSON.stringify(state.activeTask))
			}
		},
		executeTask: (state, action) => {
			if (window.confirm('Задание выполнено?')) {
			state.isAlert = 'success'
			const obj = state.activeTask.find(obj => obj.id === action.payload)
			if (obj) state.doneTask = [obj, ...state.doneTask]
			state.activeTask = state.activeTask.filter(
				obj => obj.id !== action.payload
			)

			localStorage.setItem('activeTask', JSON.stringify(state.activeTask))
			localStorage.setItem('doneTask', JSON.stringify(state.doneTask))
			}
		},
		deleteTask: (state, action) => {
			if (window.confirm('Вы уверены, что хотите удалить задание?')) {
				state.isAlert = 'error'
				const obj = state.activeTask.find(obj => obj.id === action.payload)
				if (obj) state.deletedTask = [obj, ...state.deletedTask]
				state.activeTask = state.activeTask.filter(
					obj => obj.id !== action.payload
				)

				localStorage.setItem('deletedTask', JSON.stringify(state.deletedTask))
				localStorage.setItem('activeTask', JSON.stringify(state.activeTask))
			}
		},
		addComment: (state, action) => {
			state.activeTask = state.activeTask.map(obj => {
				return { ...obj, comments: [...obj.comments, action.payload] }
			})

			localStorage.setItem('activeTask', JSON.stringify(state.activeTask))
		},
		deleteComment: (state, action) => {
			state.activeTask = state.activeTask.map(obj => {
				return {
					...obj,
					comments: [...obj.comments.filter(obj => obj.id !== action.payload)],
				}
			})

			localStorage.setItem('activeTask', JSON.stringify(state.activeTask))
		},
		setAlert: state => {
			state.isAlert = null
		},
	},
})

export const {
	executeTask,
	deleteTask,
	addComment,
	createTask,
	deleteComment,
	createMod,
	setAlert,
} = taskSlice.actions

export default taskSlice.reducer
