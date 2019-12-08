class Auth {
  isAuthenticated = false
	token = null

	constructor() {
		if (sessionStorage.getItem('token')) {
			this.isAuthenticated = true
			this.token = sessionStorage.getItem('token')
		}
	}

	login(email, password, cb) {
		if (this.isAuthenticated) {
			return cb(this.isAuthenticated)
		}

		fetch('http://www.tea-helper.es/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({email, password})
		}).then(res => res.json()).then(response => {
			let {code, token} = response

			if (token) {
				this.isAuthenticated = true;
				this.token = token
				sessionStorage.setItem('token', token)
			}

			cb(this.isAuthenticated)

		})

	}

	signout(cb) {
		this.isAuthenticated = false
		sessionStorage.removeItem('token')
		cb();
	}

}

export default Auth
