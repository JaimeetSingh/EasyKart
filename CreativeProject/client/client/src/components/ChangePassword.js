import React, { Component } from 'react'
import { changePassword } from './UserFunctions'
import { logout } from './Navbar'

class ChangePassword extends Component {

	constructor(){
		super()
		this.state = {
			email: '',
			password: '',
			newPassword: ''
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value})
	}

	onSubmit(e){
		e.preventDefault()

		const changeUser = {
			email: this.state.email,
			password: this.state.password,
			newPassword: this.state.newPassword
		}
		changePassword(changeUser).then(res => {
			logout()
			this.props.history.push('/')
 		})
	}

	render() {

		return (

			<div className="container">
				<div className="row">
					<div className="col-md-6 mt-5 mx-auto">
						<form noValidate onSubmit={this.onSubmit}>
							<h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
							<div className="form-group">
								<label htmlFor="email">Email Address</label>
								<input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange}/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Old Password</label>
								<input type="password" className="form-control" name="password" placeholder="Enter old password" value={this.state.password} onChange={this.onChange}/>
							</div>

							<div className="form-group">
								<label htmlFor="password">New Password</label>
								<input type="password" className="form-control" name="newPassword" placeholder="Enter new password" value={this.state.newPassword} onChange={this.onChange}/>
							</div>

							<button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
						</form>
					</div>
				</div>
			</div>			
		)

	}

}

export default ChangePassword

