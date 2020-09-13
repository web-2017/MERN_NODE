import React, { useReducer } from 'react'
// css
import Nav from './components/Nav'
import { reducerAuth } from './store/reducer'
import './fetch/axios'

export const CountContext = React.createContext()

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
