import React, { Component } from 'react'
import { show_women_items, addToList, addToWishlist, getItemById,show_filter_womenitems,
  show_search_womenitems } from "./UserFunctions";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Col, Button } from 'reactstrap';

class WomenItems extends Component {
  constructor() {
        super()
        this.state = {
            id: '',
            term: '',
            items: [],
            max: "",
            min: "",
            search: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onFilter = this.onFilter.bind(this);
        this.onChange = this.onChange.bind(this);
        this.noFilter = this.noFilter.bind(this);
    }

    componentDidMount () {
        this.getAll()
    }


    getAll = () => {
        show_women_items().then(data => {
            this.setState({
                items: [...data]
            },
                () => {
                  console.log("this is WomenItems in getAll: "+ this.state.items)
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


    onFilter = (min, max) => {
    console.log(this.state.min);
    console.log(this.state.max);
    show_filter_womenitems(this.state.min, this.state.max).then(data => {
      this.setState(
        {
          items: [...data]
        },
        () => {
          console.log("this is womenItems in getAll: " + this.state.items);
        }
      );
    });
  };

  onSearch = search => {
    console.log(this.state.search);
    show_search_womenitems(this.state.search).then(data => {
      this.setState(
        {
          items: [...data],
          search: ""
        },
        () => {
          console.log("this is womenItems in getAll: " + this.state.search);
        }
      );
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  noFilter(e) {
    e.preventDefault();
    show_women_items().then(data => {
      this.setState(
        {
          items: [...data],
          min: "",
          max: ""
        },
        () => {
          console.log("this is womenItems in getAll: " + this.state.items);
          console.log(this.state.term);
        }
      );
    });
  }



  render() {
    return (
       <div className="col-md-12">
        <br />
        <div className="container">
          <div className="row">
            <div className="col-6 text-left">
              <h2>Shop Women</h2>
            </div>
            <div className="col-sm-4 text-right">
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="Enter The Product Name Here"
                value={this.state.search}
                onChange={this.onChange}
              />
            </div>

            <div className="col-sm-2">
              <button
                type="submit"
                className="btn btn-md btn-outline-primary btn-block"
                onClick={this.onSearch.bind(this.state.search)}
              >
                Search!
              </button>
            </div>
          </div>
        </div>
        <br />

        <div className="col-md-12">
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  name="min"
                  placeholder="Enter The Lowest Price"
                  value={this.state.min}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control"
                  name="max"
                  placeholder="Enter The Highest Price"
                  value={this.state.max}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  className="btn btn-md btn-primary btn-block"
                  onClick={this.onFilter.bind(this.state.search)}
                >
                  Filter!
                </button>
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  className="btn btn-md btn-primary btn-block"
                  onClick={this.noFilter}
                >
                  See All
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div className="col-sm-8" />
        <br />
        <div className="card-deck text-center">
          {this.state.items.map((item, index) => (
            <div key={index}>
            <Col lm="6">
            <Card body>
            <CardImg top width="100%" src={item[2]} alt="Card image cap" onClick={this.onClick.bind(this,item[0])}/>
            <CardBody>
            <CardTitle onClick={this.onClick.bind(this,item[0])}>{item[1]}</CardTitle>
            <CardSubtitle>Price: ${item[4]}</CardSubtitle>
            <br />
            <Button className="btn-danger" onClick={this.onSubmit.bind(this,item[0])}>Add to Cart</Button>
            <Button className="btn-danger ml-sm-2" onClick={this.onAdd.bind(this,item[0])}>Add to Wishlist</Button>
            </CardBody>
          </Card>
          </Col>
          <br />
          </div>
          ))}
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default WomenItems;
