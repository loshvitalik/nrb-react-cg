import React from 'react';
import ReactDom from 'react-dom';
import LoginForm from './LoginForm';
import ProductsList from './ProductsList';
import './styles.css';
import axios from "axios";

const APP_URL = 'http://92.248.139.182:4000';

class MainForm extends React.Component {
  constructor() {
    super();
    this.logIn = this.logIn.bind(this);
    this.state = {
      isLoggedIn: false
    }
  }

  logIn(userData) {
    const {userLogin, userPassword} = userData;
    axios.post(APP_URL + '/auth/login', {UserLogin: userLogin, UserPassword: userPassword})
      .then(response => {
        if (response && response.data)
          alert('Неправильный логин или пароль');
        else
          this.setState({isLoggedIn: true});
      }).catch(response => alert('Ошибка авторизации, попробуйте ещё раз'));
  }

  render() {
    return (
      <div>
        {!this.state.isLoggedIn && <LoginForm onLogin={this.logIn}/>}
        {this.state.isLoggedIn && <ProductsList />}
      </div>
    );
  }
}

ReactDom.render(<MainForm/>, document.getElementById('app'));
