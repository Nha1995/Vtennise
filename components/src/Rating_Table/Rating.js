import React from "react";
import "./Rating.css";
import Table from "react-bootstrap/Table";
import Navigation from "../Navigation/Navigation";

class Rating extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    fetch("http://localhost:3001/players/ratings")
      .then((response) => response.json())
      .then((data) => this.setState({ players: data }));
  }

  render() {
    return (
      <>
        <div className="rates-navigation">
          <Navigation />
        </div>
        <div className="rates">
          <h1>Рейтинг игроков</h1>
          <Table size="sm" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Сыграно игр</th>
                <th>Очки</th>
              </tr>
            </thead>
            <tbody>
              {this.state.players.map((player) => {
                return (
                  <tr key={player.id}>
                    <td>{player.rank}</td>
                    <td>
                      {player.name} {player.surname}
                    </td>
                    <td>{player.games.length}</td>
                    <td>{player.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Rating;
