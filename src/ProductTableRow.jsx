import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class ProductTableRow extends React.PureComponent {
  constructor() {
    super();
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  render() {
    const {product} = this.props;
    return (
      <tr>
        <td onClick={this.handleViewProduct}>{product.name}</td>
        <td onClick={this.handleViewProduct}>{product.code}</td>
        <td onClick={this.handleViewProduct}>{product.stock + ' шт.'}</td>
        <td onClick={this.handleViewProduct}>{product.price + ' р.'}</td>
        <td className="td-action">
          <input
            className="actionButton"
            type="button"
            disabled={product.stock <= 0}
            onClick={this.handleAddProduct}
            value={this.props.isAdded ? "-" : "+"}
          />
        </td>
      </tr>
    );
  }

  handleViewProduct = () => {
    this.props.onViewProduct(this.props.product);
  };

  handleAddProduct() {
    this.props.onAddProduct(this.props.product);
  }
}

ProductTableRow.propTypes = {
  product: PropTypes.object,
  onViewProduct: PropTypes.func,
  onAddProduct: PropTypes.func,
  isAdded: PropTypes.bool
};