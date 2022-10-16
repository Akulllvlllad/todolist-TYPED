import React from 'react'



type TProps = {
	className?: string
	children: React.ReactNode
}



export const Main: React.FC<TProps> = ({ children }) => {
	return (
		<main className='App-main'>
			{children}
		</main>
	)
}
