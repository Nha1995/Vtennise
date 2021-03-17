import React from "react";
import "./Registration.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

let years = [];
for (let i = 1950; i < 2022; i++) {
  years.push(i);
}

const mounths = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

class Registration extends React.Component {
  state = {
    mounths: mounths,
    years: years,
    name: "",
    surname: "",
    mail: "",
    password: "",
    phone: null,
    day: "1",
    mounth: "Январь",
    year: "2021",
    regIsOk: false,
  };

  calculate_age = (birth_month, birth_day, birth_year) => {
    let today_date = new Date();
    let today_year = today_date.getFullYear();
    let today_month = today_date.getMonth();
    let today_day = today_date.getDate();
    let age = today_year - birth_year;

    if (today_month < birth_month - 1) {
      age--;
    }
    if (birth_month - 1 === today_month && today_day < birth_day) {
      age--;
    }
    return age;
  };

  countingDays = () => {
    let days = [];
    let lastDay = 31;
    if (
      this.state.mounth === "Январь" ||
      this.state.mounth === "Март" ||
      this.state.mounth === "Май" ||
      this.state.mounth === "Июль" ||
      this.state.mounth === "Август" ||
      this.state.mounth === "Октябрь" ||
      this.state.mounth === "Декабрь"
    ) {
      lastDay = 31;
    }
    if (
      this.state.mounth === "Апрель" ||
      this.state.mounth === "Июнь" ||
      this.state.mounth === "Сентябрь" ||
      this.state.mounth === "Ноябрь"
    ) {
      lastDay = 30;
    }

    if (this.state.mounth === "Февраль") {
      const year = this.state.year;
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        lastDay = 29;
      } else {
        lastDay = 28;
      }
    }

    for (let i = 1; i <= lastDay; i++) {
      days.push(i);
    }

    return days.map((day) => {
      return <option key={day}>{day}</option>;
    });
  };

  dayHandler = (e) => {
    this.setState({ day: e.target.value });
  };

  mounthHandler = (e) => {
    this.setState({ mounth: e.target.value });
  };

  yearHandler = (e) => {
    this.setState({ year: e.target.value });
  };

  dataHandler = (e, type) => {
    if (type === "name") {
      this.setState({ name: e.target.value });
    }
    if (type === "surname") {
      this.setState({ surname: e.target.value });
    }
    if (type === "mail") {
      this.setState({ mail: e.target.value });
    }
    if (type === "birthday") {
      this.setState({ birthday: e.target.value });
    }
    if (type === "password") {
      this.setState({ password: e.target.value });
    }
    if (type === "phone") {
      this.setState({ phone: e.target.value });
    }
  };

  registerHandler = (e) => {
    e.preventDefault();

    if (
      this.state.name !== "" &&
      this.state.surname !== "" &&
      this.state.mail !== "" &&
      this.state.password !== ""
    ) {
      let mounth = 0;

      if (this.state.mounth === "Январь") {
        mounth = 1;
      }
      if (this.state.mounth === "Февраль") {
        mounth = 2;
      }
      if (this.state.mounth === "Март") {
        mounth = 3;
      }
      if (this.state.mounth === "Апрель") {
        mounth = 4;
      }
      if (this.state.mounth === "Май") {
        mounth = 5;
      }
      if (this.state.mounth === "Июнь") {
        mounth = 6;
      }
      if (this.state.mounth === "Июль") {
        mounth = 7;
      }
      if (this.state.mounth === "Август") {
        mounth = 8;
      }
      if (this.state.mounth === "Сентябрь") {
        mounth = 9;
      }
      if (this.state.mounth === "Октябрь") {
        mounth = 10;
      }
      if (this.state.mounth === "Ноябрь") {
        mounth = 11;
      }
      if (this.state.mounth === "Декабрь") {
        mounth = 12;
      }

      const age = this.calculate_age(mounth, this.state.day, this.state.year);

      const user = {
        name: this.state.name,
        surname: this.state.surname,
        age: age,
        birthday: `${
          this.state.day < 10 ? `0${this.state.day}` : this.state.day
        }.${mounth < 10 ? `0${mounth}` : mounth}.${this.state.year}`,
        mail: this.state.mail,
        phone: this.state.phone,
        password: this.state.password,
      };

      fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      this.setState({ regIsOk: true });
    }
  };

  render() {
    return (
      <div className="registration">
        {this.state.regIsOk && (
          <p className="regSucces">Регистрация успешно пройдена!</p>
        )}
        {!this.state.regIsOk && (
          <>
            <h1>Регистрация</h1>
            <Form onSubmit={(e) => this.registerHandler(e)} className="form">
              <div className="pair">
                <Form.Group controlId="formGroupName">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    onChange={(e) => this.dataHandler(e, "name")}
                    value={this.state.name}
                    type="text"
                    placeholder="Введите имя"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupName">
                  <Form.Label>Фамилия</Form.Label>
                  <Form.Control
                    onChange={(e) => this.dataHandler(e, "surname")}
                    value={this.state.surname}
                    type="text"
                    placeholder="Введите фамилию"
                  />
                </Form.Group>
              </div>
              <div className="pair">
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Электронная почта</Form.Label>
                  <Form.Control
                    onChange={(e) => this.dataHandler(e, "mail")}
                    value={this.state.mail}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <div className="birthday-block">
                  <Form.Label>Дата рождения</Form.Label>
                  <div className="date-block">
                    <select
                      onChange={(e) => this.dayHandler(e)}
                      className="daySelect"
                    >
                      {this.countingDays()}
                    </select>
                    <select
                      onChange={(e) => this.mounthHandler(e)}
                      value={this.state.mounth}
                      className="mounthSelect"
                    >
                      {this.state.mounths.map((mounth) => {
                        return <option key={mounth}>{mounth}</option>;
                      })}
                    </select>
                    <select
                      onChange={(e) => this.yearHandler(e)}
                      className="yearSelect"
                    >
                      {this.state.years.map((year) => {
                        return <option key={year}>{year}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="pair">
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    onChange={(e) => this.dataHandler(e, "password")}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupName">
                  <Form.Label>Номер телефона</Form.Label>
                  <Form.Control
                    onChange={(e) => this.dataHandler(e, "phone")}
                    value={this.state.phone}
                    type="number"
                    placeholder="+79992223355"
                  />
                </Form.Group>
              </div>

              <Button
                type="submit"
                className="registrationBTN"
                variant="outline-success"
              >
                Зарегистрироваться
              </Button>
            </Form>
          </>
        )}
      </div>
    );
  }
}

export default Registration;
