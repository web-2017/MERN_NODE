import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// files imports
import { BASE_AUTH } from '../constants/URL'
import { response } from '../fetch/request'
import Container from '../components/Container'

// initial response class

export default function SignUp() {
	// const countContext = useContext(CountContext)
	const [value, setValue] = useState({ displayName: '', email: '', password: '', passwordCheck: '' })
	const [loading, setLoading] = useState(true)
	const [registerUser, setRegisterUser] = useState('')
	const [errors, setError] = useState('')

	// Register new user handler
	const signUpHandler = async (e) => {
		e.preventDefault()
		try {
			const options = {
				displayName: value.displayName,
				email: value.email,
				password: value.password,
				passwordCheck: value.passwordCheck,
			}
			// send request
			const res = await response.post(BASE_AUTH.register, options)
			// get requsest status
			const { success } = res

			if (success) {
				setRegisterUser(res)
				setError('')
			}
			setLoading(false)
			setError(res.msg)
		} catch (err) {
			setLoading(false)
			setRegisterUser({})
			setError(err)
		}
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
		<Container>
			<div className='row mt-4 align-items-center'>
				<div className='offset-3 col-6'>
					<h1 className='display1'>Регистрация</h1>
					<form onSubmit={signUpHandler}>
						<div className='form-group' width='600'>
							<label htmlFor='exampleInputName1'></label>
							<input
								required
								type='text'
								placeholder='nickname or name'
								value={value.displayName}
								name='displayName'
								className='form-control'
								id='exampleInputName1'
								aria-describedby='NameHelp'
								onChange={setValueHandler}
							/>
						</div>
						<div className='form-group' width='600'>
							<label htmlFor='exampleInputEmail1'></label>
							<input
								required
								placeholder='Email'
								type='email'
								name='email'
								value={value.email}
								className='form-control'
								id='exampleInputEmail1'
								aria-describedby='emailHelp'
								onChange={setValueHandler}
							/>
							<small id='emailHelp' className='form-text text-muted'>
								Мы никогда никому не передадим вашу электронную почту.
							</small>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputPassword'></label>
							<input
								required
								type='password'
								placeholder='password'
								value={value.password}
								name='password'
								className='form-control'
								id='exampleInputPassword'
								onChange={setValueHandler}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputPassword2'></label>
							<input
								required
								type='password'
								placeholder='confirm password'
								value={value.passwordCheck}
								name='passwordCheck'
								className='form-control'
								id='exampleInputPassword2'
								onChange={setValueHandler}
							/>
						</div>
						{errors ? (
							<div className='alert alert-danger' role='alert'>
								{errors}
							</div>
						) : null}

						<div className='mb-3'>
							<Link to='/signin'>Уже Есть аккаунт? войдите в систему</Link>
						</div>
						<button type='submit' className='btn btn-outline-info'>
							Зарегистрироваться
						</button>
					</form>
				</div>
			</div>
		</Container>
	)
}
