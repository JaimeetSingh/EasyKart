import React, { Component } from "react";
import { rec_men_items, rec_women_items } from "./UserFunctions";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col
} from "reactstrap";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      img: "",
      feelslike: "",
      humidity: "",
      wind: "",
      dewpoint: "",
      temp: "",
      menitems: [],
      womenitems: []
    };
    this.getAll = this.getAll.bind(this);
  }
  // fetch weather using the api
  componentDidMount() {
    // const self = this;
    // let url =
    //   "https://api.wunderground.com/api/e84a89c8be50b75a/conditions/q/MO/St_Louis.json";
    // fetch(url)
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(data) {
    //     self.setState({
    //       city: data.current_observation.display_location.city,
    //       img: data.current_observation.icon_url,
    //       feelslike: data.current_observation.feelslike_string,
    //       humidity: data.current_observation.relative_humidity,
    //       wind: data.current_observation.wind_string,
    //       dewpoint: data.current_observation.dewpoint_string
    //     });
    //   });
  }

  getAll(e) {
    e.preventDefault();
    var temp = this.state.feelslike;
    console.log(temp);
    var array = temp.slice(" ");
    console.log(array);
    let newTemp;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === "F") {
        newTemp = array[(0, i - 1)];
        console.log(newTemp);
      }
    }
    rec_men_items(newTemp).then(data => {
      this.setState(
        {
          menitems: [...data]
        },
        () => {
          console.log("this is rec_items in getAll: " + this.state.items);
        }
      );
    });
    rec_women_items(newTemp).then(data => {
      this.setState(
        {
          womenitems: [...data]
        },
        () => {
          console.log("this is rec_items in getAll: " + this.state.items);
        }
      );
    });
  }

  onClick = (id, e) => {
  	if (localStorage.usertoken !== undefined) {
  		e.preventDefault()
      localStorage.removeItem("currentItem")
      localStorage.setItem('currentItem',id)
      this.props.history.push('/detail')
  	} else {
  		alert("Please log in.")
  		this.props.history.push('/login')
  	}
    }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Welcome <br/> To EazyCart
            </h1>
          </div>
          <div>
            <h3>{this.state.city}</h3>
            <img src={this.state.img} />
            <h2>{this.state.feelslike}</h2>
            <br />
            {/* <ul className="list-group">
              <li className="list-group-item">
                <strong>Relative Humidity: </strong>
                <span>{this.state.humidity}</span>
              </li>
              <li className="list-group-item">
                <strong>Wind: </strong>
                <span>{this.state.wind}</span>
              </li>
              <li className="list-group-item">
                <strong>Dewpoint: </strong>
                <span id="temp">{this.state.dewpoint}</span>
              </li>
            </ul> */}
          </div>
        </div>
        <button
          className="btn btn-outline-primary btn-lg btn-block"
          onClick={this.getAll}
        >
          See Recommendations Today!
        </button>
        <div className="col-sm-8 mt-5" />
        <br />
        <div className="card-deck">
          {this.state.menitems.map((item, index) => (
            <div key={index}>
              <Col lm="6">
                <Card body>
                  <CardImg
                    top
                    width="100%"
                    src={item[2]}
                    alt="Card image cap"
                    onClick={this.onClick.bind(this,item[0])}
                  />
                  <CardBody>
                    <CardTitle>{item[1]}</CardTitle>
                    <CardSubtitle>Type: Men's Apparels</CardSubtitle>
                    <CardText>Price: ${item[4]}</CardText>
                    <br />
                  </CardBody>
                </Card>
              </Col>
              <br />
            </div>
          ))}

          {this.state.womenitems.map((item, index) => (
            <div key={index}>
              <Col lm="6">
                <Card body>
                  <CardImg
                    top
                    width="100%"
                    src={item[2]}
                    alt="Card image cap"
                    onClick={this.onClick.bind(this,item[0])}
                  />
                  <CardBody>
                    <CardTitle>{item[1]}</CardTitle>
                    <CardSubtitle>Type: Women's Apparels</CardSubtitle>
                    <CardText>Price: ${item[4]}</CardText>

                    <br />
                  </CardBody>
                </Card>
              </Col>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Landing;
