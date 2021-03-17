import React from "react";
import "./Search.css";

let days = [],
  rates = [];
for (let i = 5; i < 71; i++) {
  days.push(i);
}
for (let i = 0; i < 750; i = i + 20) {
  rates.push(i);
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
  

  render() {
    return (
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
              {rates.map((rate) => {
                return <option key={rate}>{rate}</option>;
              })}
            </select>
          </label>
          <button className="search-btn">Искать</button>
        </div>
        {this.state.players.length === 0 && (
          <p className="no-players-text">{this.state.noPlayers}</p>
        )}
        {this.state.players.length !== 0 && (
          <>
            {this.state.players.map((player) => {
              return (
                <div className="profile-block">
                  <img
                    className="profile-image"
                    src="https://sun9-57.userapi.com/impf/JtiWFpaI-NAfjCy9CljGpKUKEZcGUV42ivCg9g/6_Jq3k-PDr4.jpg?size=520x520&quality=96&sign=e19a68068f82ab5f137f8b4191a42add&type=album"
                  />
                  <p className="profile-name">
                    {player.name} {player.surname}
                  </p>
                  <p className="profile-name">Возраст: {player.age}</p>
                  <p className="profile-name">Игр:</p>
                  <p className="profile-name">Побед: </p>
                  <p className="profile-name">Место в рейтинге: </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default Search;
