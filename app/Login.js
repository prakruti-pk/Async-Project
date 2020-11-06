import React from "react";
import { connect } from "react-redux";
import { login } from "./store";
import LoginForm from "./LoginForm";
import OauthForm from "./OAuthForm";

const Login = (props) => {
  const { handleSubmit } = props;

  return (
    <div className="h100 w100 flex column align-items-center justify-center">
      <h1>Welcome! Enter at your own risk! (JK)</h1>
      <div className="flex w50">
        <img src="https://bit.ly/32fMCPl" />
        <div className="grow1">
          <LoginForm handleSubmit={handleSubmit} />
          <OauthForm />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(login({ email, password })).then(() => {
        ownProps.history.push("/home");
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
