import React, { useReducer } from 'react'
// css
import Nav from './components/Nav'
import { reducerAuth, CountContext } from './store/reducer'
import './fetch/axios'

const initialState = 0

function App() {
	const [count, dispatch] = useReducer(reducerAuth, initialState)
	return (
		<div className='App'>
			<CountContext.Provider value={{ countState: count, countDispatch: dispatch }}>
				<Nav />
				<p>Count - {count} </p>
			</CountContext.Provider>
		</div>
	)
}

export default App
