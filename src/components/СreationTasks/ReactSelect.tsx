import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import ReactSelect from 'react-select'
import { TData } from '.'

type TOption = {
	value: string
	label: string
}

const getValue = (value: string) =>
	value ? options.find(option => option.value === value) : ''

const options: TOption[] = [
	{
		value: 'noMatter',
		label: 'Не важно',
	},
	{
		value: 'important',
		label: 'Важно',
	},
	{
		value: 'veryImportant',
		label: 'Очень важно',
	},
]


type TProps = {
	control: Control<TData, any>
}

export const ReactSelectC: React.FC<TProps> = ({ control }) => {
	return (
		<Controller
			control={control}
			name='priority'
			rules={{
				required: 'isRequired',
			}}
			render={({ field: { onChange, value } }) => (
				<ReactSelect
					classNamePrefix='custom-select'
					value={getValue(value)}
					isSearchable={false}
					placeholder='Приоритет...'
					options={options}
					onChange={newValue => onChange((newValue as TOption).value)}
				/>
			)}
		/>
	)
}
