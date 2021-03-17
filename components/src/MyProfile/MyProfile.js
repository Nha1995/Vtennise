import React from "react";
import "./MyProfile.css";
import Navigation from "../Navigation/Navigation";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Profile from "../Profile/Profile";

class MyProfile extends React.Component {
  render() {
    return (
      <>
        <Profile {...this.props.profileData} />
      </>
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
const updatedInProfile = functionFromConnect(MyProfile);

export default updatedInProfile;
