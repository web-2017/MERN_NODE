import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// Components and Pages
import About from '../views/About'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Dashboard from '../views/Dashboard'

export default function Nav() {
	return (
		<Router>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<Link to='/' className='navbar-brand'>
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
						<li className='nav-item active'>
							<Link to='/dashboard' className='nav-link'>
								Dashboard <span className='sr-only'>(current)</span>
							</Link>
						</li>
					</ul>
					<span className='navbar-text'>asdfasdfasd</span>
					<ul className='navbar-nav'>
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
					</ul>
				</div>
			</nav>

			<Switch>
				<Route path='/about'>
					<About />
				</Route>
				<Route exact path='/signup'>
					<SignUp />
				</Route>
				<Route exact path='/signin' component={SignIn}>
					<SignIn />
				</Route>
				<Route path='/dashboard'>
					<Dashboard />
				</Route>
			</Switch>
		</Router>
	)
}
