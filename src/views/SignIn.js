import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CountContext } from '../store/reducer'
import Container from '../components/Container'
import { response } from '../fetch/request'
import { BASE_AUTH } from '../constants/URL'

export default function SignIn() {
	const countContext = useContext(CountContext)
	const [loading, setLoading] = useState(true)
	const [value, setValue] = useState({ email: '',  password: ''})
	const [errors, setError] = useState('')
	const [user, setUser] = useState([])

	const signInHandler = async (e) => {
		e.preventDefault()

		if(value.email == '' || value.password == '') return

		try {
			const options = {
				email: value.email,
				password: value.password,
			}

			const res = await response.post(BASE_AUTH.login, options)

			setLoading(false)
			setUser(res)
			setError(res.msg)


		} catch (err) {
			setLoading(false)
			setUser({})
			setError(err)
		}
	}

	const setValueHandler = (e) => {
		const { name, value } = e.target
		setValue((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	return (
		<Container>
			{/* <h1>SignIn</h1>
			<p>{countContext.countState}</p> 
			<button onClick={() => countContext.countDispatch('increment')}>increment</button>
			<button onClick={() => countContext.countDispatch('decrement')}>decrement</button>
			<button onClick={() => countContext.countDispatch('reset')}>reset</button> */}
			<div className='row mt-4 align-items-center'>
				<div className='offset-3 col-6'>
					<div className='spinner-border text-primary' role='status'>
						<span className='sr-only'>Loading...</span>
						<span className='sr-only'>{errors ? errors : ''}</span>
					</div>
					<form onSubmit={signInHandler}>
						<div className='form-group' width='600'>
							<label htmlFor='exampleInputEmail1'>Email address</label>
							<input
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
							<label htmlFor='exampleInputPassword'>Password</label>
							<input
								type='password'
								value={value.password}
								name='password'
								className='form-control'
								id='exampleInputPassword'
								onChange={setValueHandler}
							/>
						</div>
							{ errors ? 
								<div className="alert alert-danger" role="alert">
								{errors}
							</div> : null}
							  
						
						<div className='mb-3'>
							<Link to='/signup'>
								Нет аккаунта? Зарегистрироваться
							</Link>
						</div>
						<input type='submit' value='Войти' className='btn btn-primary' />
					</form>
				</div>
			</div>
		</Container>
	)
}
