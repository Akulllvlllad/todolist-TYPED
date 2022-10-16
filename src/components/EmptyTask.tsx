import { Box, Typography } from '@mui/material'
import React from 'react'

export const EmptyTask = () => {
	return (
		<Box
			sx={{
				minHeight: '80vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography
				sx={{
					fontSize: '40px'
				}}
			>
				Список пуст
			</Typography>
		</Box>
	)
}
