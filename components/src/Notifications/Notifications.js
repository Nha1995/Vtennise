import React from "react";
import "./Notifications.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Notifications extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const getUsers = async () => {
      const response = await fetch(
        `http://localhost:3001/notifications/${this.props.profileData.id}`
      );
      const data = await response.json();
      this.setState({ players: data });
    };
    getUsers();
  }

  render() {
    return (
      <>
        <div className="players-navigation">
          <Navigation />
        </div>
        <div className="not-main-block">
          <h1 className="notif-title">Уведомления</h1>
          {this.state.players.length > 0 ? (
            <div className="challenge-player-block">
              <h3 className="notif-challenge">Вам бросили вызов!</h3>
              <table className="notif-table">
                <thead className="head-block-notif">
                  <tr >
                    <th>Пользователь</th>
                    <th>Телефон</th>
                    <th>Профиль</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.players.map((player) => {
                    return (
                      <tr className="player-block-notif" key={player.id}>
                        <td>
                          {player.name} {player.surname}
                        </td>
                        <td>{player.phone}</td>
                        <td>
                          <Link
                            className="notif-href"
                            to={"/profile/" + player.id}
                          >
                            <span>Перейти в профиль</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h3 className="notif-not-challenge">Список пуст</h3>
          )}
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
const updatedInProfile = functionFromConnect(Notifications);

export default updatedInProfile;
// {this.state.players.map((player) => {
//                 return (
//                   <>
//                     <div className="">
//                       <span className="notif-name-surname">
//                         {player.name} {player.surname} Номер телефона:{player.phone}
//                       </span>
//                       <Link className="notif-href" to={"/profile/" + player.id}>
//                         <span>Перейти в профиль</span>
//                       </Link>
//                     </div>
//                   </>
//                 );
//               })}
