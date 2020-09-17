import React, { useContext, useState, useEffect, Fragment, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'

// Components and Pages
import About from '../views/About'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Dashboard from '../views/Dashboard'

import { RouteConfig } from '../routers/RouterConfig'
import { routesNav } from '../routers/routes'

import { UserContext } from '../store/userContext'

export default function Nav() {
	// get user auth context
	const { user, setUser } = useContext(UserContext)
	// let history = useHistory()
	// Выход из системы
	const loginOutHandler = async () => {
		localStorage.removeItem('token')
		localStorage.removeItem('isAuthorized')
		setUser({ user: null, token: null })
		// history.push('/home')
	}

	const showGreeting = () => {
		const date = new Date()
		const hours = date.getHours()
		const time = date.getMinutes()
		return `Привет Jhon Doe, Сегодня ${date.getFullYear()}г. ${hours}:${time} мин`
	}

	return (
		<Router history={useHistory}>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<Link to='/home' className='navbar-brand'>
					Home
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarText'
					aria-controls='navbarText'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarText'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item active'>
							<Link to='/about' className='nav-link'>
								About <span className='sr-only'>(current)</span>
							</Link>
						</li>
						{user.user ? (
							<li className='nav-item active'>
								<Link to='/dashboard' className='nav-link'>
									Dashboard <span className='sr-only'>(current)</span>
								</Link>
							</li>
						) : null}
					</ul>
					<span className='navbar-text'>{user.user ? user.user : showGreeting()}</span>
					<ul className='navbar-nav'>
						{!user.user ? (
							<Fragment>
								<li className='nav-item'>
									<Link to='/signup' className='nav-link'>
										sign up <span className='sr-only'>(current)</span>
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/signin' className='nav-link'>
										sign in <span className='sr-only'>(current)</span>
									</Link>
								</li>
							</Fragment>
						) : null}
						{user.user ? (
							<li className='nav-item'>
								<Link to='/home' className='nav-link' onClick={loginOutHandler}>
									Выход <span className='sr-only'>(current)</span>
								</Link>
							</li>
						) : null}
					</ul>
				</div>
			</nav>

			<Switch>
				<Route exact path='/' render={() => (user.user ? <Redirect to='/dashboard' /> : <Redirect to='/home' />)} />
				<Route path='/about'>
					<About />
				</Route>
				<Route exact path='/signup' component={SignUp}>
					{user.user ? <Redirect to='/dashboard' /> : <SignUp />}
				</Route>
				<Route exact path='/signin' component={SignIn}>
					{user.user ? <Redirect to='/dashboard' /> : <SignIn />}
				</Route>
				<Route path='/dashboard'>{!user.user ? <Redirect to='/' /> : <Dashboard />}</Route>
			</Switch>
		</Router>
	)
}
