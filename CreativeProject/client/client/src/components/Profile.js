import React, { Component } from 'react'
import { addFriend, getFriend, deleteFriend, viewFriendPurchased } from "./UserFunctions";
import jwt_decode from 'jwt-decode'

class Profile extends Component {

	constructor() {
		super()
		this.state = {
			id: '',
            term: '',
            items: [],
			userid: '',
			firstname: '',
			lastname: '',
			email: '',
			friendemail: '',
			errors: {}
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
        this.onDelete = this.onDelete.bind(this)
	}


	componentDidMount(){
		const token = localStorage.usertoken
		const decoded = jwt_decode(token)
		this.setState({
			userid: decoded.sub.userid,
			firstname: decoded.sub.firstname,
			lastname: decoded.sub.lastname,
			email: decoded.sub.email
		})
		this.getAll()
	}				

	onChange(e){
		this.setState({[e.target.name]: e.target.value})
	}

	getAll = () => {
		getFriend().then(data => {
            this.setState({
                items: [...data]
            },
                () => {
                	console.log("this is items in getALl: "+ this.state.items)
                    console.log(this.state.term)
                })
        })
    }

	onSubmit = (val, e) => {
        e.preventDefault()
        if (val !== this.state.email) {
        addFriend(val).then(() => {
            this.getAll()
        })
    	} else {
    		alert("You cannot add yourself.")
    	}
    }

    onDelete = (val, e) => {
        e.preventDefault()
        	deleteFriend(val).then(() => {
        	this.getAll()
        })
    }

    onView = (val, e) => {
        e.preventDefault()
        localStorage.removeItem("friendemail")
      	localStorage.setItem('friendemail',val)
      	console.log("this is friendemail lLLLLLLLLLLLL "+localStorage.friendemail)
        this.props.history.push('/purchased')
    }

    onPassword = () => {
    	this.props.history.push('/changePassword')
    }



	render() {
		return (

			<div className="container">
				<div className="jumbotron mt-5">
					<div className="col-sm-8 mt-5">
						<h1 className="text-center">Profile</h1>
					</div>

					<table className="table col-md-6 mx-auto">
						<tbody>
							<tr>
								<td>First Name</td>
								<td>{this.state.firstname}</td>
							</tr>
							<tr>
								<td>Last Name</td>
								<td>{this.state.lastname}</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>{this.state.email}</td>
							</tr>
							<tr>
								<td><button className="btn btn-secondary ml-sm-2" onClick={this.onView.bind(this, this.state.email)}>View Purchase History</button></td>
								<td><button className="btn btn-info ml-sm-2" onClick={this.onPassword.bind(this)}>Change Password</button></td>
							</tr>
						</tbody>
					</table>
				</div>

					<div>
						<div className="row">
                            <div className="col-sm-5">
                                <input type="email" className="form-control" name="friendemail" placeholder="Enter friend email" value={this.state.friendemail} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-2">
                                <button className="btn btn-danger ml-sm-2" onClick={this.onSubmit.bind(this,this.state.friendemail)}>Add Friend</button>
                            </div>
                        </div>
                    </div>
               		<br />
                    <div>
                    <h4>Your Friends</h4>
                    <table className="table col-sm-6">
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">{item[1]}</td>
                                <td className="text-right">
                                	<button className="btn btn-secondary" onClick={this.onView.bind(this, item[1])}>View Purchased</button>
                                    <button className="btn btn-danger ml-sm-2" onClick={this.onDelete.bind(this, item[1])}>Delete</button>
                                </td>
                            </tr>
                        ))}
                	</table>
                	</div>



			</div>	

		)
	}

}

export default Profile

