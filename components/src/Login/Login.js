import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import store from "../redux/store";

class Login extends React.Component {
  state = {
    mail:"",
    password:"",
    loginMessage:"",
    passwordMessage:"",
    inProfile:false,
  }

  dataHandler = (e,type) => {
    if(type === "mail"){
     this.setState({mail: e.target.value}) 
    }
    if(type === "password"){
      this.setState({password: e.target.value}) 
     }
  }

  loginHandler = () => {
    let login;
    try {
      const getPlayers = async () => {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        login = data.find((user)=>user.mail === this.state.mail);
        
        if(!login){
          this.setState({loginMessage:"*Неверный логин",passwordMessage:""})
        } else {
          if(login.password!==this.state.password) {
            this.setState({passwordMessage:"*Неверный пароль",loginMessage:""})
          } else {
            store.dispatch({
              type:"INPROFILE",
              payload:{
                inProfile:true,
              }
            });
            // console.log("LOGIN",login)
            store.dispatch({
              type:"PROFILEDATA",
              payload:{
                profileData:login,
              }
            });
          }
        }
      };
      getPlayers();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="main-loin-block">
        <div className="login-block">
            <h3>Авторизация</h3>
            {this.state.loginMessage && <p className="error-message-login">{this.state.loginMessage}</p>}
            <input onChange={(e)=>this.dataHandler(e,"mail")} value={this.state.mail} className="loginInput" placeholder="E-mail" type="text"></input>
            {this.state.passwordMessage && <p className="error-message-password">{this.state.passwordMessage}</p>}
            <input onChange={(e)=>this.dataHandler(e,"password")} value={this.state.password} className="passwordInput" placeholder="Password" type="password"></input>
            <Link to={this.state.inProfile? "/myprofile" : "/login"}><Button onClick={() =>this.loginHandler()} className="loginBTN" variant="outline-light">Войти</Button></Link>
        </div>
        <Link to="/registration">
          <Button className="regButton1" variant="outline-success">
            Регистрация
          </Button>
        </Link>
      </div>
    );
  }
}

export default Login;
