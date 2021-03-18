import React from "react";
import "./Header.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import store from "../redux/store";

class Header extends React.Component {
  state = {
    inProfile: false,
  };

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      this.setState({ inProfile: state.inProfile });
    });
  }

  exitHandler = () => {
    store.dispatch({
      type:"INPROFILE",
      payload:{
        inProfile:false,
      }
    });
  }

  render() {
    return (
      <div className="header">
        <Link className="logo-link" to="/">
          <div className="logo">
            <span className="logo__text">intennis.ru</span>
            <img
              className="logo__icon"
              src="https://raw.githubusercontent.com/Nha1995/intennis/main/images/tennis.png"
            />
          </div>
        </Link>
        <div className="navBlock">
          <Link className="navText" to="/players">
            <span>Игроки</span>
          </Link>
          <Link className="navText" to="/">
            <span>История игр</span>
          </Link>
          <Link className="navText" to="/rates">
            <span>Рейтинги</span>
          </Link>
          <Link className="navText" to="/courts">
            <span>Корты</span>
          </Link>
          <span className="navText">О нас</span>
        </div>
        {this.state.inProfile || (
          <Link to="/login">
            <Button variant="outline-primary">Войти</Button>
          </Link>
        )}
        {this.state.inProfile && (
          <Link to="/login">
            <Button onClick={()=>this.exitHandler()} variant="outline-primary">Выход</Button>
          </Link>
        )}
      </div>
    );
  }
}

export default Header;