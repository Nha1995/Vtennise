import React from "react";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import { connect } from "react-redux";

class Profile extends React.Component {  

  render() {
      const {name , surname, age, birthday, mail} = this.props;
    return (
      <div className="my-profile">
        <Navigation />
        <div className="my-profile-block">
          <img
            className="my-profile-image"
            src="https://sun9-57.userapi.com/impf/JtiWFpaI-NAfjCy9CljGpKUKEZcGUV42ivCg9g/6_Jq3k-PDr4.jpg?size=520x520&quality=96&sign=e19a68068f82ab5f137f8b4191a42add&type=album"
          />
          <div className="profile-data">
            <p>
              {name} {surname}
            </p>
            <p className="my-profile-data-text">
              E-mail: {mail}
            </p>
            <p className="my-profile-data-text">
              Дата рождения: {birthday}
            </p>
            <p className="my-profile-data-text">
              Возраст: {age}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inProfile: state.inProfile,
    profileData: state.profileData,
  };
};

const functionFromConnect = connect(mapStateToProps);
const updatedInProfile = functionFromConnect(Profile);

export default updatedInProfile;