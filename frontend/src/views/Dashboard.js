import React, { useState } from 'react'
import MainContainer from '../components/MainContainer'
import { response } from '../fetch/request'
import { BASE_AUTH } from '../constants/URL'

import { Loader } from '../components/Loader'

export default function Dashboard(props) {
	const [value, setValue] = useState({ title: '', body: '' })
	const [loading, setLoading] = useState(false)
	const [errors, setError] = useState('')

	// login handler
	const signInHandler = async (e) => {
		e.preventDefault()

		if (value.title === '' || value.body === '') return

		try {
			const options = {}
			setLoading(true)

			// const res = await response.post(BASE_AUTH.login, options)

			// const { success } = res
		} catch (err) {}
	}

	// onChange values handler
	const setValueHandler = (e) => {
		const { name, value } = e.target
		setValue((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}
	return (
		<MainContainer>
			<h1>Dashboard</h1>
			<div>
				<h2>Create post</h2>
				<form onSubmit={signInHandler}>
					{errors ? (
						<div className='alert alert-danger' role='alert'>
							{errors}
						</div>
					) : null}
					<div className='form-group' width='600'>
						<label htmlFor='exampleInputTitle'>Заголовок статьи</label>
						<input
							required
							type='title'
							name='title'
							value={value.title}
							className='form-control'
							id='exampleInputTitle'
							aria-describedby='emailHelp'
							placeholder='Title'
							onChange={setValueHandler}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleInputText'>Статья</label>
						<textarea
							required
							type='body'
							value={value.body}
							name='body'
							className='form-control'
							id='exampleInputText'
							placeholder='body'
							onChange={setValueHandler}
						/>
					</div>
					<button type='submit' className='btn btn-outline-dark'>
						Создать
					</button>
				</form>
			</div>
		</MainContainer>
	)
}
