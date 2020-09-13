import React from 'react'
import './Loader.scss'

export const Loader = () => {
	return (
		<div className='Loader'>
			<div className='spinner-border text-info' role='status'>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	)
}
