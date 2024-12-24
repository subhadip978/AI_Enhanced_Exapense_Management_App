import React from 'react'

const Inputfield = ({label,id, name, value, onChange}) => {
	return (
		<div>

			<form className='flex flex-col' action="">

				<label htmlFor="name" className='block text-sm font-medium text-gray-700'>{label}</label>

				<input className='mt-1 p-2  border rounded-md text-black focus:border-gray-200 focus:outline-none '

					id={id}
					name={name}
					value={value}
					onChange={onChange}

				/>
			</form>



		</div>
	)
}

export default Inputfield