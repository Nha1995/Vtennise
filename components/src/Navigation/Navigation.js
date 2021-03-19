import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

class Navigation extends React.Component {
  state = {
    duels: [],
  };

  componentDidMount() {
    const getDuels = async () => {
      const response = await fetch(
        `http://localhost:3001/notifications/${this.props.profileData.id}`
      );
      const data = await response.json();
      this.setState({ duels: data });
    };
    getDuels();
  }

  render() {
    return (
      <div className="nav">
        {this.props.inProfile || (
          <>
            <div>
              <ul className="first">
                <li>-Регистрация</li>
                <li>-Поиск соперника</li>
                <li>-Вызов на дуэль</li>
                <li>-Бронирование корта</li>
              </ul>
            </div>
            <div>
              <Link to="/registration">
                <Button className="regButton" variant="outline-success">
                  Регистрация
                </Button>
              </Link>
            </div>
          </>
        )}
        {this.props.inProfile && (
          <div className="profile-navigation">
            <Link to="/myprofile" className="nav-buttons">
              <span>Мой профиль</span>
            </Link>
            <Link to="/history" className="nav-buttons">
              <span>Мои игры</span>
            </Link>
            <Link to="/search" className="nav-buttons">
              <span>Подбор соперника</span>
            </Link>
            <Link to="/notifications" className="nav-buttons">
              <span>
                Уведомления{" "}
                {this.state.duels.length > 0 ? (
                  <div className="notifications-count">
                    {this.state.duels.length}
                  </div>
                ) : (
                  <></>
                )}
              </span>
            </Link>
          </div>
        )}
      </div>
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
const updatedInProfile = functionFromConnect(Navigation);

export default updatedInProfile;
