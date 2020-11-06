import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import store, { getUser } from "./store";
import Login from "./Login";
import User from "./User";

const Main = withRouter(
  class MainComponent extends Component {
    async componentDidMount() {
      await store.dispatch(getUser());
      await this.props.history.push("/home");
    }
    render() {
      return (
        <Switch>
          <Route path="/home" component={User} />
          <Route component={Login} />
        </Switch>
      );
    }
  }
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById("main")
);
