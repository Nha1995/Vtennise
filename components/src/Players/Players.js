import React from "react";
import "./Players.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Players extends React.Component {
  state = {
    users: [],
    noPlayers: true,
    players:[]
  };

  componentDidMount() {
    try {
      const getUsers = async () => {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        if (data.length === 0) {
          this.setState({ noPlayers: true });
        } else {
          this.setState({ noPlayers: false });
        }
        this.setState({ users: data });
      };
      getUsers();
    } catch (err) {
      console.log(err);
    }
    const getPlayers = async () => {
      const response = await fetch("http://localhost:3001/players");
      const data = await response.json();
      console.log(data);
      this.setState({players:data.players})
    }
    getPlayers();
  }

  render() {
    return (
      <div className="players">
        <h1 className="players-title">Игроки</h1>
        {this.state.noPlayers && (
          <p className="no-players-text">К сожалению, список пуст</p>
        )}
        {this.state.noPlayers || (
          <>
            {this.state.users.map((user) => {
              this.player = this.state.players.find((player)=>{
                if(user.id == player.id) {
                  console.log("PLAYERS",player)
                  return player;
                };
              })
              return (
                <Link to={user.id==this.props.profileData.id ? "/myprofile" : "/profile/"+user.id}>
                  <div className="profile-block">
                    <img
                      className="profile-image"
                      src="https://sun9-57.userapi.com/impf/JtiWFpaI-NAfjCy9CljGpKUKEZcGUV42ivCg9g/6_Jq3k-PDr4.jpg?size=520x520&quality=96&sign=e19a68068f82ab5f137f8b4191a42add&type=album"
                    />
                    <p className="profile-name">
                      {user.name} {user.surname}
                    </p>
                    <p className="profile-name">Возраст: {user.age}</p>
                    {this.player && <p className="profile-name">Игр:{this.player.games.length}</p>}
                    {this.player && <p className="profile-name">Побед: {this.player.wins}</p>}
                     {this.player && <p className="profile-name">Место в рейтинге:{this.player.rank}</p>}
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      inProfile: state.inProfile,
      profileData:state.profileData
  }
};

const functionFromConnect = connect(mapStateToProps);
const updatedInProfile = functionFromConnect(Players);

export default updatedInProfile;