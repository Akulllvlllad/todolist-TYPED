import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
	executeTask,
	deleteTask,
	addComment,
	createTask,
	deleteComment,
	createMod,
	setAlert,
} from '../store/slices/TaskSlice'

const useAppDispatch = () => useDispatch()

const AllActions = {
	executeTask,
	deleteTask,
	addComment,
	createTask,
	deleteComment,
	createMod,
	setAlert,
}

export const useActions = () => {
	const appDispatch = useAppDispatch()
	return bindActionCreators(AllActions, appDispatch)
}
