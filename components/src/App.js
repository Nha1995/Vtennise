import React from "react";
import "./App.css";
import Header from "./Header/Header";
import { Route, Switch } from "react-router-dom";
import Rating from "./Rating_Table/Rating";
import Courts from "./Courts/Courts";
import Registration from "./Registration/Registration";
import Carousel from "./Carousel/Carousel";
import store from "./redux/store";
import Login from "./Login/Login";
import Players from "./Players/Players";
import Search from "./Search/Search";
import MyProfile from "./MyProfile/MyProfile";
import UserProfile from "./UserProfile/UserProfile";
import History from "./History/History";
import Footer from "./Footer/Footer";
import Notifications from "./Notifications/Notifications";

class App extends React.Component {
  state = {
    inProfile: false,
  };

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      this.setState({ inProfile: state.inProfile });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className={"main"}>
          <Switch>
            <Route path="/rates" component={Rating} />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/courts" component={Courts} />
            <Route path="/players" component={Players} />
            <Route path="/search" component={Search} />
            <Route path="/myprofile" component={MyProfile} />
            <Route path="/profile/:id" component={UserProfile} />
            <Route path="/history" component={History} />
            <Route path="/notifications" component={Notifications} />            
            <Route path="/" component={Carousel} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
