




export type TCommentText  =  {
	text: string
}

export interface IComment extends TCommentText {
	id: string
	
}



export interface IExercise {
	readonly id: string
	title: string
	text: string
	priority: 'noMatter' | 'important' | 'veryImportant'
	comments: IComment[]
}




export interface IInitialState {
	activeTask: IExercise[]
	deletedTask: IExercise[]
	doneTask: IExercise[]
	isCreating: boolean
	isAlert: 'success' | 'error' | 'warning' | 'info' | null
}
