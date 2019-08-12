import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product';
import Categories from './Categories';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            category: "",
            search: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filter = this.filter.bind(this);
        this.getFilteredProducts = this.getFilteredProducts.bind(this);
    }

    handleChange(event) {
        this.setState({search: event.target.value}, this.filter);
    }

    handleSubmit(event) {
        // value of category list
        let category = event.target.childNodes[0].value;
        this.setState({ category: category }, this.filter);
        event.preventDefault();
    }

    filter() {
        var url;
        if (this.state.category === "") {
            if (this.state.search === "") {
                this.componentDidMount();
                return;
            }
            else {
                url = 'http://localhost:8080/product/search/' + this.state.search;
                  
            }
        }
        else {
            if (this.state.search === "") {
                url = 'http://localhost:8080/product/category/' + this.state.category;
                  
            }
            else {
                url = 'http://localhost:8080/product/categorysearch/' + this.state.category
                    + '/' + this.state.search;
            }
        }
        this.getFilteredProducts(url);
    }

    getFilteredProducts(url) {
        axios.get(url).then(response => {
                this.setState({ products: response.data })
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
                <h1>Ministore</h1>
                <form onSubmit={this.handleSubmit}>
                    <Categories />
                    <input type="submit" value="Submit" />
                    <br></br>
                    <input type="text" placeholder="Search" onChange={this.handleChange} />
                </form>
                {productItem}
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