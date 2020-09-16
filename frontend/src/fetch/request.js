export class RequestsHandler {
	constructor(token, userName) {
		this.token = token || localStorage.getItem('token')
		this.isAuthorized = userName || localStorage.getItem('user')
	}

	/**
	 * @param {String} url
	 * @param {String} token
	 */
	async get(url, token) {
		const options = {
			method: 'GET',
			headers: { 'x-auth-token': token },
		}
		try {
			const response = await fetch(url, options)
			const result = await response.json()
			return result
		} catch (error) {
			return error
		}
	}

	/**
	 * @param {String} url
	 * @param {Object} body
	 * @param {String} token
	 */
	async signIn(url, body) {
		try {
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
			const response = await fetch(url, options)
			const result = await response.json()
			const { success } = result

			if (success) {
				// get and set token
				const { token, displayName } = result
				this.token = token
				this.isAuthorized = displayName
				localStorage.setItem('token', this.token)
				// set user name
				localStorage.setItem('isAuthorized', this.isAuthorized)
			}

			return result
		} catch (error) {
			console.error(error)
		}
	}
	async post(url, body) {
		try {
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': this.token,
				},
				body: JSON.stringify(body),
			}
			const response = await fetch(url, options)
			const result = await response.json()
			return result
		} catch (error) {
			console.error(error)
		}
	}
}

export const response = new RequestsHandler()
