import React from "react";
import "./Courts.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import store from "../redux/store";

store.dispatch({
  type: "BACKGROUND",
  payload: {
    background: "background1",
  },
});

class Courts extends React.Component {
  render() {
    return (
      <>
        <Link className="courts-block" to="/courts/KLGTennisXL">
          <div>
            <div className="court">Tennis XL</div>
          </div>
        </Link>
        <p className="court-text-info">Адрес:Россия, Калуга, ул.<br/> Салтыкова-Щедрина д.139</p>
      </>
    );
  }
}

export default Courts;
