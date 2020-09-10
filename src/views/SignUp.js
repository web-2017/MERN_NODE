import React, { useState } from 'react'
// files imports
import { BASE_AUTH } from '../constants/URL'
import { RequestsHandler } from '../fetch/request'
import Container from '../components/Container'

// initial response class
const response = new RequestsHandler()

export default function SignUp() {
	const [state, setState] = useState({ displayName: '', email: '', password: '', passwordCheck: '' })
	const registerInputValuesHandler = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const registerUserHandler = async (e) => {
		e.preventDefault()
		// const res = await response.post(BASE_AUTH.register, state)
		// console.log(res);
	}

	const loginUserHandler = async (e) => {
		const options = {
			email: 'test@gmail.com',
			password: 'addqdd',
		}
		const res = await response.post(BASE_AUTH.login, options)
		console.log(res)
	}

	const getUser = async () => {
		const res = await response.get(
			BASE_AUTH.users,
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTIzOGVlYTQxNWEzMGEzMGM5ZGU2MiIsImlhdCI6MTU5OTIyNDA2MH0.FhAzJFH3Yd2zvj9IVi4dG6wtwtL8U1VM3BgamA1QGqY'
		)
		console.log(res)
	}
	return (
		<Container>
			<h2>Register</h2>
			<form onSubmit={registerUserHandler}>
				<input
					value={state.displayName}
					type='text'
					placeholder='name'
					onChange={registerInputValuesHandler}
					name='displayName'
				/>
				<br />
				<input value={state.email} type='text' placeholder='email' onChange={registerInputValuesHandler} name='email' />
				<br />
				<input
					value={state.password}
					type='text'
					placeholder='password'
					onChange={registerInputValuesHandler}
					name='password'
				/>
				<br />
				<input
					value={state.passwordCheck}
					type='text'
					placeholder='passwordCheck'
					onChange={registerInputValuesHandler}
					name='passwordCheck'
				/>
				<br />
				<input type='submit' value='register' />
			</form>

			<button onClick={() => loginUserHandler()}>Login</button>
		</Container>
	)
}
