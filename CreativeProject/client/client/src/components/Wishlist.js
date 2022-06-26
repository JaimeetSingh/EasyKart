import React, { Component } from 'react'
import { getWishlist, deleteWishlist, addToList } from './UserFunctions'

class Wishlist extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            term: '',
            items: []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount () {
        this.getAll()
    }


    getAll = () => {
        getWishlist().then(data => {
            this.setState({
                items: [...data]
            },
                () => {
                	console.log("this is wishlist in getAll: "+ this.state.items)
                    console.log(this.state.term)
                })
        })
    }

    onSubmit = (val, e) => {
        e.preventDefault()
        addToList(val).then(() => {
            this.getAll()
        })
    }



    onDelete = (val, e) => {
        e.preventDefault()
        deleteWishlist(val).then(() => {
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
				<h1>Wishlists</h1>
			</div>
            <table className="table">
                <tbody>
                    {this.state.items.map((item, index) => (
                    <tr key={index}>
                        <td className="text-left">
                        	<div className="form-group">
                                <img top width="80px" src={item[3]} alt="Card image cap" onClick={this.onClick.bind(this,item[0])} />
                            	<label className="col-sm-2 mr-sm-2 text-left">{item[2]}</label>
                            	<label className="col-sm-6 text-right">Price: $ {item[5]}</label>
                                <button className="btn btn-outline-danger ml-sm-2" onClick={this.onSubmit.bind(this,item[0])}>Add to Cart</button>
                                <button className="btn btn-danger ml-sm-2" onClick={this.onDelete.bind(this,item[0])}>Delete</button>
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

export default Wishlist