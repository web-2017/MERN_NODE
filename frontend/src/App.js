import React, { useState, useEffect, useMemo } from 'react'

// css
import Nav from './components/Nav'
import { reducerAuth } from './store/reducer'
import { UserContext } from './store/userContext'
import './fetch/axios'

function App() {
	const [user, setUser] = useState({ user: null, token: null })
	const setUserHandler = () => {
		const data = {
			token: localStorage.getItem('token'),
			user: localStorage.getItem('isAuthorized'),
		}
		if (data.token && data.user) {
			setUser(data)
			return data
		}
		return 'Нет данных'
	}

	useEffect(() => {
		setUserHandler()
	}, [user.token])

	const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

	return (
		<div className='App'>
			<UserContext.Provider value={providerUser}>
				<Nav />
			</UserContext.Provider>
		</div>
	)
}

export default App
