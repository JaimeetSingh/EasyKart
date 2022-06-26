import React, { Component } from 'react'
import { viewFriendPurchased, addToList, addToWishlist } from './UserFunctions'

class Purchased extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            term: '',
            items: [],
            friendemail: localStorage.friendemail
        }
    }

    componentDidMount () {
        this.getAll()
        console.log("this is friendemail in purchased: "+ localStorage.friendemail)
        console.log("this is friendemail in purchased: "+ this.state.friendemail)
    }


    getAll = () => {

        viewFriendPurchased(this.state.friendemail).then(data => {
            this.setState({
                items: [...data]
            },
                () => {
                    console.log("this is items in getALl: "+ this.state.items)
                    console.log(this.state.term)
                })
        })
    }

    onCart = (val, e) => {
        e.preventDefault()
        addToList(val).then(() => {
            this.getAll()
        })
    }

    onAdd = (val, e) => {
        e.preventDefault()
        addToWishlist(val).then(() => {
            this.getAll()
        })
    }

    onClick = (id, e) => {
      e.preventDefault()
      localStorage.removeItem("currentItem")
      localStorage.setItem('currentItem',id)
      this.props.history.push('/detail')
    }
     	
    render () {
        return (
        <div className="col-md-12">
            <div className="col-sm-8 mt-5">
				<h1>Purchase History</h1>
			</div>
            <table className="table">
                <tbody>
                    {this.state.items.map((item, index) => (
                    <tr key={index}>
                        <td className="text-left">
                        	<div className="form-group">
                                <img top width="80px" src={item[3]} alt="Card image cap" onClick={this.onClick.bind(this,item[0])}/>
                            	<label className="mr-sm-2 col-sm-3 text-left">{item[2]}</label>
                            	<label className="col-md-5 text-left">Price: $ {item[5]}</label>
                                <button className="btn btn-danger text-right" onClick={this.onCart.bind(this,item[0])}>Add to Cart</button>
                                <button className="btn btn-danger ml-sm-3 text-right" onClick={this.onAdd.bind(this,item[0])}>Add to Wishlist</button>
                          	</div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Purchased


