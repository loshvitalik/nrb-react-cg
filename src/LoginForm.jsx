import React from "react";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  handleLoginChange(change) {
    if (change.userLogin)
      this.setState({userLogin: change.userLogin});
    if (change.userPassword)
      this.setState({userPassword: change.userPassword});
  }

  logIn() {
    this.props.onLogin({userLogin: this.state.userLogin, userPassword: this.state.userPassword});
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="label">Логин</div>
          <input
            type="text"
            onChange={e =>
              this.handleLoginChange({ userLogin: e.target.value })
            }
          />
        </div>
        <div className="row">
          <div className="label">Пароль</div>
          <input
            type="password"
            onChange={e =>
              this.handleLoginChange({ userPassword: e.target.value })
            }
          />
        </div>
        <input
          className="editButton"
          type="button"
          onClick={this.logIn}
          value="Войти"
        />
      </div>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func
};

export default LoginForm;