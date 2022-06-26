import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'


class Navbar extends Component {
	logOut(e){
		e.preventDefault()
		localStorage.removeItem('usertoken')
		localStorage.removeItem("currentItem")
		this.props.history.push('/')
	}


	render() {
		const loginRegLink = (
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/register">Register</Link>
				</li>
			</ul>
		)

		const userLink = (
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/womenitems">Women</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/menitems">Men</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/wishlist">Wishlist</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/cart">Cart</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/profile">Account</Link>
				</li>
				<li className="nav-item">
					<a href="" onClick={this.logOut.bind(this)} className="nav-link">Logout</a>
				</li>
			</ul>
		)

		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target = "#navbar1" aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
					</ul>
					{localStorage.usertoken ? userLink : loginRegLink}
				</div>

			</nav>
		)
	}
}

export const logout = () =>{
	localStorage.removeItem('usertoken')
	} 
export default withRouter(Navbar)