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
                className="d-block w-100 img-height"
                src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1123x407:1125x405)/origin-imgresizer.eurosport.com/2021/02/09/2989001-61335748-2560-1440.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100 img-height"
                src="https://img.gazeta.ru/files3/857/10494857/RIAN_00919905.HR.ru-pic4_zoom-1500x1500-36700.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100 img-height"
                src="https://tennishead.net/wp-content/uploads/2020/02/Rafael-Nadal-hulking-up-at-US-Open.jpg"
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
