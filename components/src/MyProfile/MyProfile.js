import React from "react";
import "./MyProfile.css";
import { connect } from "react-redux";
import Profile from "../Profile/Profile";

class MyProfile extends React.Component {
  state = {
    player: {},
  };

  componentDidMount() {
    fetch(`http://localhost:3001/player/${this.props.profileData.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA",data)
        const playerData = {
          wins: data.player.wins,
          points: data.player.points,
          games: data.player.games.length,
          rank: data.player.rank,
        };
        this.setState({ player: playerData });
      });
  }

  render() {
    console.log(this.props)
    return (
      <>
        <Profile
          {...this.props.profileData}
          wins={this.state.player.wins}
          rank={this.state.player.rank}
          games={this.state.player.games}
          points={this.state.player.points}
        />
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