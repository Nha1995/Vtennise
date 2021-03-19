import React from "react";
import "./Carousel.css";
import Carousel from "react-bootstrap/Carousel";
import Navigation from "../Navigation/Navigation";
import store from "../redux/store";
import { connect } from "react-redux";

class CarouselCl extends React.Component {

  render() {
    return (
      <div className="carousel-main">
        <Navigation />
        <div className="carousel">
          <Carousel>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100"
                src="https://raw.githubusercontent.com/Nha1995/intennis/main/images/Maria-Sharapova001%20(1).jpg"
                alt="First slide"
              />
              <Carousel.Caption>
              <h3>Maria Sharapova</h3>
                <p>US OPEN 2012</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100 img-height"
                src="https://raw.githubusercontent.com/Nha1995/intennis/main/images/Maria-Sharapova019.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
              <h3>Maria Sharapova</h3>
                <p>
                  Roland Garros 2011
                </p>                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100 img-height"
                src="https://raw.githubusercontent.com/Nha1995/intennis/main/images/full%20.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      inProfile: state.inProfile
  }
};

const functionFromConnect = connect(mapStateToProps);
const updatedInProfile = functionFromConnect(CarouselCl);

export default updatedInProfile;
