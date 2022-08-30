import React from 'react';
import PropTypes from 'prop-types';
import ProductTableRow from './ProductTableRow';
import './styles.css';

export default class ProductTable extends React.PureComponent {
  render() {
    const {products, onViewProduct, onAddProduct} = this.props;
    return (
      <div className="table">
        <table>
          <thead>
          <tr>
            <th>Название</th>
            <th>Код</th>
            <th>В наличии</th>
            <th>Цена</th>
            <th>В корзину</th>
          </tr>
          </thead>
          <tbody>
          {products.map(product => (
            <ProductTableRow product={product} key={product.id} isAdded={product.isAdded} onViewProduct={onViewProduct} onAddProduct={onAddProduct}/>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

ProductTable.propTypes = {
  products: PropTypes.array,
  onViewProduct: PropTypes.func,
  onAddProduct: PropTypes.func
};