import React from 'react'
export const reducerAuth = (state, action, initialState = 0) => {
	switch (action) {
		case 'increment':
			return state + 1
		case 'decrement':
			return state - 1
		case 'reset':
			return initialState

		default:
			return state
	}
}
