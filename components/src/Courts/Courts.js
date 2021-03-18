import React from "react";
import "./Courts.css";
import { Link } from "react-router-dom";

class Courts extends React.Component {
  render() {
    return (
      <>
          <div className="courts-block">
            <div className="court">Tennis XL</div>
          </div>
        <p className="court-text-info">
          Адрес:Россия, Калуга, ул.
          <br /> Салтыкова-Щедрина д.139
        </p>
        <div id="outerdiv">
          <iframe
            src="https://tenniskaluga.ru/online_booking"
            id="innerIframe"
          />
        </div>
      </>
    );
  }
}

export default Courts;
