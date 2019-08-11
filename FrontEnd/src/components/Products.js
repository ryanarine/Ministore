import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product';
import Categories from './Categories';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filterCategory = this.filterCategory.bind(this);
    }

    handleSubmit(event) {
        // value of category list
        let category = event.target.childNodes[0].value;
        this.filterCategory(category);
        event.preventDefault();
    }

    filterCategory(category) {
        if (category === "") {
            this.componentDidMount();
        }
        else {
            axios.get('http://localhost:8080/product/filter/' + category).then(response => {
                this.setState({ products: response.data }, () => {
                    //console.log(this.state);
                })
            })
        }
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
                <form onSubmit={this.handleSubmit}>
                    <Categories />
                    <input type="submit" value="Submit" />
                </form>
                <ul>
                    {productItem}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        axios.get('http://localhost:8080/product/all').then(response => {
            this.setState({ products: response.data }, () => {
                //console.log(this.state);
            })
        })
    }
}
export default Products;