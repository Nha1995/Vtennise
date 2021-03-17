import React from "react";
import "./Rating.css";
import Table from "react-bootstrap/Table";

class Rating extends React.Component {
  render() {
    return (
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
            <tr>
              <td>1</td>
              <td>Николаева Виктория</td>
              <td>23</td>
              <td>325</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Иванов Дмитрий</td>
              <td>18</td>
              <td>100</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Николаева Виктория</td>
              <td>23</td>
              <td>325</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Иванов Дмитрий</td>
              <td>18</td>
              <td>100</td>
            </tr>
            
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Rating;
