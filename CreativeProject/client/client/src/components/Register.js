import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {

	constructor(){
		super()
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: ''
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value})
	}

	onSubmit(e){
		e.preventDefault()

		const newUser = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.password
		}
		register(newUser).then(res => {
			this.props.history.push('/login')
 		})

	}

	render() {

		return (

			<div className="container">
				<div className="row">
					<div className="col-md-6 mt-5 mx-auto">
						<form noValidate onSubmit={this.onSubmit}>
							<h1 className="h3 mb-3 font-weight-normal">Register</h1>
							<div className="form-group">
								<label htmlFor="firstname">First Name</label>
								<input type="text" className="form-control" name="firstname" placeholder="Enter First Name" value={this.state.firstname} onChange={this.onChange}/>
							</div>

							<div className="form-group">
								<label htmlFor="lastname">Last Name</label>
								<input type="text" className="form-control" name="lastname" placeholder="Enter Last Name" value={this.state.lastname} onChange={this.onChange}/>
							</div>


							<div className="form-group">
								<label htmlFor="email">Email Address</label>
								<input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange}/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange}/>
							</div>

							<button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
						</form>
					</div>
				</div>
			</div>			
		)

	}

}

export default Register

