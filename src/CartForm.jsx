import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {Dropdown} from "./Dropdown";
import CountdownTimer from "./CountdownTimer";

const APP_URL = 'http://92.248.139.182:4000';
const DELIVERY_TYPES = [
  {
    id: '1',
    value: 'self',
    label: 'Самовывоз',
    key: 'dt'
  },
  {
    id: '2',
    value: 'pickpoint',
    label: 'Пункт выдачи',
    key: 'dt2'
  },
  {
    id: '3',
    value: 'courier',
    label: 'Курьером',
    key: 'dt3'
  }
]

export default class CartForm extends React.Component {
  constructor() {
    super();
    this.state = {
      promocode: '',
      offerTime: 10 * 60,
      deliveryType: ''
    };
    this.handleCheckPromo = this.handleCheckPromo.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  render() {
    let seconds = this.state.offerTime;
    return (
      <div className="cartForm">
        <div className="row">
          <div className="label">Промокод</div>
          <input
            type="text"
            onChange={e => this.handlePromoChange({promo: e.target.value})}
          />
        </div>
        <div className="promoCheckContainer">
          <input
            type="submit"
            className="promoButton"
            value="Применить промокод"
            onClick={this.handleCheckPromo}
          />
        </div>
        <div className="row">
          <div className="label">До окончания акции</div>
          <div className="timer-value"><CountdownTimer seconds={seconds}/></div>
        </div>
        <div className="row">
          <div className="label">Способ доставки</div>
          <div className="value">
            <Dropdown onChange={this.handleDeliveryTypeChange} name='deliveryType' title='Выберите...' list={DELIVERY_TYPES}/>
          </div>
        </div>
        <div className="saveContainer">
          <input
            type="submit"
            className="formButton"
            value="Оформить заказ"
            onClick={this.handleOrder}
          />
        </div>
      </div>
    );
  }

  handlePromoChange = value => {
    this.setState({
      promocode: value.promo
    });
  }

  handleCheckPromo = () => {
    axios.post(APP_URL + '/promo/check', {promocode: this.state.promocode})
      .then(response => {
        if (response.data)
          alert('Не удалось применить промокод: ' + response.data);
        else
          alert('Промокод успешно применён');
      })
      .catch(response => {
        alert(response)
      });
  }

  handleDeliveryTypeChange = value => {
    this.setState({
    deliveryType: value.label
  });
}

  handleOrder = () => {
    if (this.props.products.length === 0) {
      alert('В корзину не добавлено ни одного продукта');
      return;
    }

    axios.post(APP_URL + '/order/place', {products: this.props.products, deliveryType: this.state.deliveryType, promocode: this.state.promocode})
      .then(response => {
        if (response.data) {
          alert(response.data)
          this.props.onPlaceOrder();
        }
        else
          alert('Не удалось оформить заказ, попробуйте ещё раз');
      })
      .catch(response => alert('Не удалось оформить заказ, попробуйте ещё раз'));
  }
}

CartForm.propTypes = {
  products: PropTypes.array,
  onPlaceOrder: PropTypes.func
};
