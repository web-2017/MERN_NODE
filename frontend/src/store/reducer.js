import React from 'react'
export const reducerAuth = (state, action, initialState = false) => {
	switch (action) {
		case 'isAuth':
			return true
		case 'logOut':
			return false
		case 'reset':
			return initialState

		default:
			return state
	}
}
