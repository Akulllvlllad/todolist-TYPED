import { Alert } from '@mui/material'

import React from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { RootState } from '../../store/store'



export const Alerts = () => {
	const { isAlert } = useSelector((state: RootState) => state.task)
	const {setAlert} = useActions()
	React.useEffect(() => {
		setTimeout(setAlert, 2500)
	}, [isAlert])

	
	
	if (Boolean(isAlert)){
		return <div className='alerts'>{<ReturnAlert isAlert={isAlert} />}</div>
	}
		return null
}

type TProps = {
	isAlert: string | null
}

const ReturnAlert: React.FC<TProps> = ({ isAlert }) => {
	

	if (isAlert === 'success') {
		
		return <Alert severity='success'>Молодец! Ты сделал это!) 😃</Alert>
	}
	if (isAlert === 'error') {
		
		return <Alert severity='error'>Зачем удалил? 🤨 </Alert>
	}
	if (isAlert === 'warning') {
		
		return (
			<Alert severity='warning'>This is a warning alert — check it out!</Alert>
		)
	}
	if (isAlert === 'info') {
		
		return <Alert severity='info'>Новое задание создано, дерзай 🤩</Alert>
	}

	return <></>
}
