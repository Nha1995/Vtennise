import React from "react";
import "./Search.css";
import Navigation from "../Navigation/Navigation";

let days = [],
  rates = [],
  gamesCount = [];
for (let i = 5; i < 71; i++) {
  days.push(i);
}
for (let i = 0; i < 750; i = i + 20) {
  rates.push(i);
}
for (let i = 0; i <= 150; i = i + 5) {
  gamesCount.push(i);
}

class Search extends React.Component {
  state = {
    name: null,
    ageFrom: 5,
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
    let params = {
      name: this.state.name,
      ageFrom: this.state.ageFrom,
      rateFrom: this.state.rateFrom,
      games: this.state.games,
    };

    fetch("http://localhost:3001/search", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",        
      },
      body : JSON.stringify(params)
    })
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
          {this.state.players.length === 0 && (
            <p className="no-players-text">{this.state.noPlayers}</p>
          )}
        </div>
      </>
    );
  }
}

export default Search;
