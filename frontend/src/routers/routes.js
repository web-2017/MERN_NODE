// Components and Pages
import Home from '../views/Home'
import About from '../views/About'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Dashboard from '../views/Dashboard'

export const routesNav = [
	{
		path: '/home',
		component: Home,
	},
	{
		path: '/dashboard',
		component: Dashboard,
	},
	{
		path: '/about',
		component: About,
	},
	{
		path: '/signIn',
		component: SignIn,
	},
	{
		path: '/signUp',
		component: SignUp,
	},
	// {
	// 	path: '/tacos',
	// 	component: Tacos,
	// 	routes: [
	// 		{
	// 			path: '/tacos/bus',
	// 			component: Bus,
	// 		},
	// 		{
	// 			path: '/tacos/cart',
	// 			component: Cart,
	// 		},
	// 	],
	// },
]
