const auth = 'https://pictoteask2.000webhostapp.com'

class Auth {
  isAuthenticated = false
	id    = null
	token = null

	constructor() {
		if (sessionStorage.getItem('token')) {
			this.isAuthenticated = true
			this.token = JSON.parse(sessionStorage.getItem('token'))
		}
	}

	login(email, password, cb) {
		if (this.isAuthenticated) {
			return cb(this.isAuthenticated)
		}

		let formData = new FormData()
		formData.append('email', email)
		formData.append('password', password)

		fetch(`${auth}/loginTutor.php`, {
			method: 'POST',
			body: formData
		}).then(res => res.json()).then(response => {
			let {error, error_msg, tutor} = response

			let info = ''

			if (error) {

				info = error_msg

			} else {

				this.isAuthenticated = true;
				this.token = tutor
				sessionStorage.setItem('token', JSON.stringify(tutor))

			}

			cb(this.isAuthenticated, info)

		})

	}

	register(name, surname, email, password, cpassword, cb) {

		let formData = new FormData()
		formData.append('name', name)
		formData.append('surname', surname)
		formData.append('email', email)
		formData.append('password', password)
		formData.append('cpassword', cpassword)

		fetch(`${auth}/registroTutor.php`, {
			method: 'POST',
			body: formData
		}).then(res => res.json()).then(response => {
			let {error, error_msg, user} = response

			let info = ''

			if (error) {

				info = error_msg

			} else {

				this.isAuthenticated = true;
				this.token = user
				sessionStorage.setItem('token', JSON.stringify(user))

			}

			cb(this.isAuthenticated, info)

		})

	}

	logout(cb) {
		this.isAuthenticated = false
		sessionStorage.removeItem('token')
		cb();
	}

}

export default Auth
