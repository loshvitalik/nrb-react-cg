import React from 'react';
import ViewProductForm from './ViewProductForm';
import CartForm from "./CartForm";
import ProductTable from "./ProductTable";
import './styles.css';

export default class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          id: 1,
          name: 'Motherboard UT165LZ-32P1',
          code: '89138765',
          price: 8000,
          stock: 3,
          imageSrc: 'https://media.gamestop.com/i/gamestop/11177831/MSI-PRO-Z690-A-DDR5-LGA-1700-ATX-Intel-Motherboard',
          isAdded: false
        },
        {
          id: 2,
          name: 'CPU Intel Core 9600K',
          code: '24536346',
          price: 17000,
          stock: 14,
          imageSrc: 'https://c.dns-shop.ru/thumb/st4/fit/300/300/19efa9c65c28108eaf772af1c0657002/fe7db6233dd930c5c219aca64398cfb7e519d364494ddcd96949ce757d9b7740.jpg',
          isAdded: false
        },
        {
          id: 3,
          name: 'SSD Samsung 860 EVO',
          code: '75631684',
          price: 3500,
          stock: 0,
          imageSrc: 'https://www.tradeinn.com/f/13747/137476250/samsung-860-evo-250gb-%D0%96%D0%B5%D1%81%D1%82%D0%BA%D0%B8%D0%B9-%D0%B4%D0%B8%D1%81%D0%BA.jpg',
          isAdded: false
        },
        {
          id: 4,
          name: 'HDD WD Blue 1 TB',
          code: '13842689',
          price: 2700,
          stock: 1,
          imageSrc: 'https://avatars.mds.yandex.net/get-mpic/4415357/img_id1338722080590462404.jpeg/orig',
          isAdded: false
        },
        {
          id: 5,
          name: 'iPhone 12 PRODUCT(RED) 128 GB',
          code: '04627959',
          price: 86000,
          stock: 32,
          imageSrc: 'https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1602686328042-601UYWSRVF16QBZ47WX8/iPhone+12+%28PRODUCT%29RED',
          isAdded: false
        },
        {
          id: 6,
          name: 'Тестовый продукт',
          code: '333',
          price: 222,
          stock: 111,
          imageSrc: 'https://content2.flowwow-images.com/data/flowers/1000x1000/58/1627553207_32205258.jpg',
          isAdded: false
        },
      ],
      selectedProduct: null,
      isCartView: false
    };
  }

  render() {
    const {products: products, selectedProduct: selectedProduct, isCartView: isCartView} = this.state;
    return (
      <div className="root">
        <div className="top-container">
          <div className="top-left-item">
            <h2>
              {selectedProduct && selectedProduct.name}
              {!selectedProduct && !isCartView && 'Продукты'}
              {!selectedProduct && isCartView && 'Корзина'}
            </h2>
          </div>
          <div className="top-right-item">
            <input
              className="editButton"
              type="button"
              onClick={this.handleOpenCart}
              value={`${isCartView ? 'Закрыть' : 'Корзина'} (${products.filter(p => p.isAdded).length})`}
            />
          </div>
        </div>
        {selectedProduct && <ViewProductForm product={selectedProduct} onClose={this.handleCloseProduct}/>}
        {!selectedProduct && <ProductTable
          products={isCartView ? products.filter(p => p.isAdded) : products}
          onViewProduct={this.handleViewProduct}
          onAddProduct={this.handleAddProduct}
        />}
        {isCartView && <CartForm products={products.filter(p => p.isAdded)} onPlaceOrder={this.handleClearCart}/>}
      </div>
    );
  }

  handleOpenCart = () => {
    this.setState({
      isCartView: !this.state.isCartView,
      selectedProduct: null
    })
  }

  handleViewProduct = product => {
    this.setState({
      selectedProduct: product
    });
  };

  handleAddProduct = product => {
    product.isAdded = !product.isAdded;
    this.setState({
      products: this.state.products.map(p => (p.id === product.id ? product : p))
    });
  }

  handleCloseProduct = product => {
    this.setState({
      selectedProduct: null,
      products: this.state.products.map(p => (p.id === product.id ? product : p))
    });
  };

  handleClearCart = () => {
    var products = this.state.products;
    products.forEach(p => p.isAdded = false);
    this.setState({
      products: products
    })
  }
}