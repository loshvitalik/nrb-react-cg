import React from 'react';
import PropTypes from 'prop-types';

export default class ViewProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.product && prevState.product !== nextProps.product) {
      return { product: nextProps.product };
    }
    return null;
  }

  render() {
    const { product } = this.state;
    return (
      <div className="form">
        <div className="row">
          {product.imageSrc && <img className="product-image" src={product.imageSrc} alt={product.name || ''}/>}
        </div>
          <div className="row">
            <div className="label">Наименование</div>
            <input
              type="text"
              value={product.name || ''}
              disabled
            />
          </div>
          <div className="row">
            <div className="label">Код</div>
            <input
              type="text"
              value={product.code || ''}
              disabled
            />
          </div>
          <div className="row">
            <div className="label">В наличии</div>
            <input
              type="text"
              value={product.stock || 'недоступно'}
              disabled
            />
          </div>
          <div className="row">
            <div className="label">Цена</div>
            <input
              type="text"
              value={product.price || ''}
              disabled
            />
          </div>
        <div className="saveContainer">
          <input
            type="submit"
            className="formButton"
            value="Закрыть"
            onClick={this.handleClose}
          />
        </div>
      </div>
    );
  }

  handleClose = () => {
    this.props.onClose(this.state.product);
  };
}

ViewProductForm.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func
};
