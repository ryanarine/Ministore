import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product'

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }
    getproducts() {
        axios.get('http://localhost:8080/Allproduct').then(response => {
            this.setState({ products: response.data }, () => {
                console.log(this.state);
            })
        })
    }
            
    render() {
        var productItem = this.state.products.map((item, i)=> {
            return (
                <Product key={item.id} name={item.name} category={item.category} weight={item.weight} price={item.price} />
            )
        })
        return (
            <div>
                <h1>Products</h1>
                <ul>
                    {productItem}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        this.getproducts();
    }
}
export default Products;