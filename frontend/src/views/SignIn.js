import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Container from '../components/Container'
import { response } from '../fetch/request'
import { BASE_AUTH } from '../constants/URL'

import { Loader } from '../components/Loader'
import { UserContext } from '../store/userContext'

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState({ email: '', password: '' })
  const [errors, setError] = useState('')
  const { user, setUser } = useContext(UserContext)

  const history = useHistory()

  // login handler
  const signInHandler = async (e) => {
    e.preventDefault()

    if (value.email === '' || value.password === '') return

    try {
      const options = {
        email: value.email,
        password: value.password
      }
      setLoading(true)

      const res = await response.signIn(BASE_AUTH.login, options)
      const { success } = res
      if (success) {
        setUser({ user: res.displayName, token: res.token })
        setError('')
        setLoading(false)
        history.push('/dashboard')
      }
      setLoading(false)
      setError(res.msg)
    } catch (err) {
      setLoading(false)
      setUser({})
      setError(err)
    }
  }

  // onChange values handler
  const setValueHandler = (e) => {
    const { name, value } = e.target
    setValue((prevState) => ({
      ...prevState,
      [name]: value
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
          <h1 className='display1'>Авторизация</h1>
          {loading ? <Loader /> : null}
          <form onSubmit={signInHandler}>
            <div className='form-group' width='600'>
              <label htmlFor='exampleInputEmail1'>Email</label>
              <input
                required
                type='email'
                name='email'
                value={value.email}
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Email address'
                onChange={setValueHandler}
              />
              <small id='emailHelp' className='form-text text-muted'>
                Мы никогда никому не передадим вашу электронную почту.
              </small>
            </div>
            <div className='form-group'>
              <label htmlFor='exampleInputPassword'>Password</label>
              <input
                required
                type='password'
                value={value.password}
                name='password'
                className='form-control'
                id='exampleInputPassword'
                placeholder='password'
                onChange={setValueHandler}
              />
            </div>
            {errors ? (
              <div className='alert alert-danger' role='alert'>
                {errors}
              </div>
            ) : null}

            <div className='mb-3'>
              <Link to='/signup'>Нет аккаунта? Зарегистрироваться</Link>
            </div>
            <button type='submit' className='btn btn-outline-dark'>
              Войти
            </button>
          </form>
        </div>
      </div>
    </Container>
  )
}
