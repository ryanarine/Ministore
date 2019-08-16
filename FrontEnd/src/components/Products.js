import React, { Component } from 'react';
import Product from './Product';
import './Products.css';

class Products extends Component {
    render() {
        var productItem = this.props.products.map((item, i) => {
            return (
                <Product key={item.id} name={item.name} category={item.category} weight={item.weight} price={item.price} />
            )
        });
        return (
            <div className="grid">
                {productItem}
            </div>
        );
    }

}

export default Products;