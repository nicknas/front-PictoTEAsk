const auth = {
	isAuthenticated: false,
	request(email, password, cb) {

		fetch("https://pictoteask.000webhostapp.com/loginTutor.php", {
			method: 'POST',
			body: JSON.stringify({email, password}),
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => console.log('Success:', response));

	},
	login(email, password, cb) {
		if (this.isAuthenticated) { // prevent doble login
			return cb(this.isAuthenticated);
		}

		this.request.bind(this)(email, password, (resp) => {
			if (resp.authenticated) {
				console.log(resp);
				cb(true);
			}else{
				cb(false);
			}
		});
	},
	signout(cb) {
		this.isAuthenticated = false;
		cb();
	}
}

const fakeAuth = Object.assign({}, auth)
Object.setPrototypeOf(fakeAuth, auth)

fakeAuth.request = function(email, password, cb) {

	this.isAuthenticated = true; // only true in fake

	const authenticated = this.isAuthenticated;
	const token = 'fake';

	cb({ authenticated, token, email });

}

export {
	auth,
	fakeAuth
};
