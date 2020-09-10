export class RequestsHandler {
	constructor(options) {
		this.options = options
	}

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

	async post(url, body, token = '') {
		try {
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': token,
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



