import React from "react";
import "./Search.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

let days = [],
  rates = [],
  gamesCount = [];
for (let i = 5; i < 71; i++) {
  days.push(i);
}
for (let i = 0; i < 750; i = i + 25) {
  rates.push(i);
}
for (let i = 0; i <= 50; i++) {
  gamesCount.push(i);
}

class Search extends React.Component {
  state = {
    name: null,
    ageFrom: null,
    rateFrom: null,
    games: null,
    players: [],
  };

  componentDidMount() {
    try {
      const getUsers = async () => {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        if (data.length === 0) {
          this.setState({ noPlayers: "К сожалению, список пуст" });
        } else {
          this.setState({ noPlayers: "" });
        }
        this.setState({ players: data });
      };
      getUsers();
    } catch (err) {
      console.log(err);
    }
  }

  valueHandler = (e, field) => {
    if (field === "name") {
      this.setState({ name: e.target.value });
    }
    if (field === "ageFrom") {
      this.setState({ ageFrom: e.target.value });
    }
    if (field === "rait") {
      this.setState({ rateFrom: e.target.value });
    }
    if (field === "games") {
      this.setState({ games: e.target.value });
    }
  };

  searchHandler = () => {
    fetch(
      `http://localhost:3001/search?name=${this.state.name}&age=${this.state.ageFrom}&rate=${this.state.rateFrom}&games=${this.state.games}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("ВОТ ЧТО ПОЛУЧИЛОСЬ", data);
        this.setState({
          players: data,
        });
      });
  };

  render() {
    return (
      <>
        <div className="players-navigation">
          <Navigation />
        </div>
        <div className="search">
          <h1>Поиск игрока</h1>
          <div className="search-block">
            <label>
              Имя:{" "}
              <input
                onChange={(e) => this.valueHandler(e, "name")}
                value={this.state.name}
                className="search-input"
                type="text"
              />
            </label>
            <label>
              Возраст от:{" "}
              <select
                onChange={(e) => {
                  this.valueHandler(e, "ageFrom");
                }}
                value={this.state.ageFrom}
              >
                {days.map((day) => {
                  return <option key={day}>{day}</option>;
                })}
              </select>
            </label>
            <label>
              Рейтинг от:
              <select
                onChange={(e) => {
                  this.valueHandler(e, "rait");
                }}
                value={this.state.rateFrom}
              >
                {rates.map((rate) => {
                  return <option key={rate}>{rate}</option>;
                })}
              </select>
            </label>
            <label>
              Количество игр от:
              <select
                onChange={(e) => {
                  this.valueHandler(e, "games");
                }}
                value={this.state.games}
              >
                {gamesCount.map((rate) => {
                  return <option key={rate}>{rate}</option>;
                })}
              </select>
            </label>
            <button onClick={() => this.searchHandler()} className="search-btn">
              Искать
            </button>
          </div>
          {this.state.players.length > 0 ? (
            this.state.players.map((player) => {
              return (
                <Link to={player.id === +this.props.profileData.id ? "/myprofile" : `/profile/${player.id}`}>
                  <div className="profile-block">
                    <img
                      className="profile-image"
                      src="https://sun9-57.userapi.com/impf/JtiWFpaI-NAfjCy9CljGpKUKEZcGUV42ivCg9g/6_Jq3k-PDr4.jpg?size=520x520&quality=96&sign=e19a68068f82ab5f137f8b4191a42add&type=album"
                    />
                    <p className="profile-name">
                      {player.name} {player.surname}
                    </p>
                    <p className="profile-name">Возраст: {player.age}</p>
                    <p className="profile-name">Игр:{player.games}</p>
                    <p className="profile-name">Очки:{player.points}</p>
                    <p className="profile-name">
                      Место в рейтинге:{player.rank}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <></>
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
const updatedInProfile = functionFromConnect(Search);

export default updatedInProfile;