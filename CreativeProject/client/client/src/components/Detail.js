import React, { Component } from 'react'
import { addToWishlist, addToList, getCommentList, deleteComment, addComment, getItemById} from './UserFunctions'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Col, Button } from 'reactstrap';



class Detail extends Component {
  constructor() {
		super()
		this.state = {
			id: '',
            term: '',
            items: [],
			userid: '',
            itemid: localStorage.currentItem,
            itemname: '',
			itemprice: '',
			itemtype:'',
			itempicture: '',
			commenttext: '',
			errors: {},
			itemInfo: []
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onCart = this.onCart.bind(this)
        this.onAdd = this.onAdd.bind(this)
	}


	componentDidMount(){
		this.getAll()
	}


	onChange(e){
		this.setState({[e.target.name]: e.target.value})
	}

	getAll = () => {

		getItemById(this.state.itemid).then(data =>{
        	Object.keys(data).forEach(key => {
          		console.log(data[key])
          		if (data[key][4] === "f") {
          			this.setState({
        				itemprice: data[key][2],
        				itemname: data[key][1],
        				itempicture: data[key][3],
        				itemtype: "Women's Appeal"
        			},
        			() => {
        			})
          		} else {
          			this.setState({
        				itemprice: data[key][2],
        				itemname: data[key][1],
        				itempicture: data[key][3],
        				itemtype: "Men's Appeal"
        			},
        			() => {
        			})
          		}
          		});
        })

		getCommentList(this.state.itemid).then(data => {
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
        const commentvariable = {
			itemid: this.state.itemid,
			commenttext: this.state.commenttext
		}
        addComment(commentvariable).then(() => {
            this.getAll()
    })
	}

    onDelete = (val, e) => {
        e.preventDefault()
        	deleteComment(val).then(() => {
        	this.getAll()
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


    render() {
		return (

			<div className="container">
				<div className="jumbotron mt-5">
					<div className="col-sm-8">
						<h1 className="text-left">Item Detail</h1>
					</div>
                    <br />
					<Col lm="8" className="text-center">
            		<Card body className="text-center">
            		<CardImg top width="100%" src={this.state.itempicture} alt="Card image cap"/>
            		<CardBody>
            		<CardTitle>{this.state.itemname}</CardTitle>
            		<CardSubtitle>Type: {this.state.itemtype}</CardSubtitle>
            		<CardText>Price: ${this.state.itemprice}</CardText>
            		<Button className="btn-danger" onClick={this.onCart.bind(this,this.state.itemid)}>Add to Cart</Button>
            		<Button className="btn-danger ml-sm-2" onClick={this.onAdd.bind(this,this.state.itemid)}>Add to Wishlist</Button>
            		</CardBody>
          			</Card>
          			</Col>
				</div>

					<div>
						<div className="row">
                            <div className="col-sm-5">
                                <input type="email" className="form-control" name="commenttext" placeholder="Enter your comment" value={this.state.commenttext} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-2">
                                <button className="btn btn-danger ml-sm-2" onClick={this.onSubmit.bind(this,this.state.commenttext)}>Add Comment</button>
                            </div>
                        </div>
                    </div>
               		<br />
                    <div>
                    <h4>All Comments</h4>
                    <table className="table col-sm-10">
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                
                                <td className="text-left">
                                <label>{item[0]} {item[1]}: </label>
                                <label className="ml-sm-3">{item[3]}</label>
                                </td>
                                <td className="text-right">
                                    <button className="btn btn-danger" onClick={this.onDelete.bind(this, item[4])}>Delete</button>
                                </td>
                            </tr>
                        ))}
                	</table>
                	</div>
                	<br />
                	<br />



			</div>	

		)
	}

    
}

export default Detail;
