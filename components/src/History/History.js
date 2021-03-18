import React from "react";
import "./History.css";
import { connect } from "react-redux";
import Navigation from "../Navigation/Navigation";

class History extends React.Component {
  state = {
    games: [],
  };

  componentDidMount() {
    fetch(`http://localhost:3001/history/${this.props.profileData.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ games: data });
      });
  }

  render() {
    console.log(this.state.games);
    return (
      <>
        <div className="history">
          <Navigation />
          <div className="history-second-block">
            <h1>История игр</h1>
            {this.state.games.map((game) => {
              let className =
                game.win == +this.props.profileData.id
                  ? "game-win"
                  : "game-lose";
              console.log("CLASSNAME", className);
              return (
                <div className={"user-games " + className}>
                  <p>
                    {game.player1.name} {game.player1.surname}
                  </p>
                  <p>VS</p>
                  <p>
                    {game.player2.name} {game.player2.surname}{" "}
                  </p>
                  <p>
                    {game.win == +this.props.profileData.id
                      ? "Победа"
                      : "Поражение"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
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
const updatedInProfile = functionFromConnect(History);

export default updatedInProfile;
