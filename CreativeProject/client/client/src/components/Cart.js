import React, { Component } from 'react'
import { getList, deleteItem, updateItem, addToPurchaseList } from './UserFunctions'

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            term: '',
            items: [],
            totalprice: '',
            tax: '',
            totalpriceaftertax:''
        }

        this.add = this.add.bind(this)
        this.subtract = this.subtract.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount () {
        this.getAll()
    }


    getAll = () => {
        getList().then(data => {
            this.setState({
                items: [...data],
                totalprice: localStorage.totalprice,
                tax: (localStorage.totalprice * 0.042).toFixed(2),
                totalpriceaftertax: (parseFloat(localStorage.totalprice)+ parseFloat((localStorage.totalprice * 0.042).toFixed(2))).toFixed(2)
            },
                () => {
                	console.log("this is items in getALl: "+ this.state.items)
                    console.log(this.state.term)
                })
        })
    }



    onDelete = (val, e) => {
        e.preventDefault()
        deleteItem(val).then(() => {
        	this.getAll()
        })
    }

  	add = (item, itemid) => {
    	updateItem(item + 1, itemid).then(() => {
            this.getAll()
        })
  	}

  	subtract = (item, itemid) => {
    	updateItem(item - 1, itemid).then(() => {
            this.getAll()
        })
  	}


  	onSubmit = (e) => {
        e.preventDefault()
        addToPurchaseList().then(() => {
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
				<h1>Shopping Cart</h1>
			</div>
            <table className="table">
                <tbody>
                    {this.state.items.map((item, index) => (
                    <tr key={index}>
                        <td className="text-left">
                        	<div className="form-group" >
                                <img top width="75px" src={item[4]} alt="Card image cap" onClick={this.onClick.bind(this,item[0])}/>
                            	<label className="col-sm-3 text-left">{item[3]}</label>
                            	<label className="col-sm-6 text-center">Price: $ {item[6]}</label>
                                <button className="btn btn-outline-primary" onClick={this.add.bind(this,item[2],item[0])}>+</button>
                                <label className="ml-sm-2 mr-sm-2"> {item[2]} </label>
                                <button className="btn btn-outline-primary" onClick={this.subtract.bind(this,item[2],item[0])} disabled={item[2] < 2}>-</button>
                                <button className="btn btn-outline-danger ml-sm-5 text-right" onClick={this.onDelete.bind(this, item[0])}>X</button>
                          	</div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="totalprice text-right">
            	<label className="col-sm-8">Total Price: ${this.state.totalprice}</label>
            	<label className="col-sm-8">Tax (4.2%): ${this.state.tax}</label>
            	<label className="col-sm-8">Total Price after Tax: ${this.state.totalpriceaftertax}</label>
            </div>
            <div className="totalprice text-right mr-sm-3">
            	<button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Purchase</button>
            </div>
        </div>
        )
    }
}

export default Cart


