import React, { Component } from 'react';
import axios from 'axios';
import Products from './Products';
import Categories from './Categories';
import Account from './Account';
import { baseUrl } from './Constants';
import Logo from './logo.PNG';

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class Store extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            category: "",
            search: "",
            name: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filter = this.filter.bind(this);
        this.getFilteredProducts = this.getFilteredProducts.bind(this);
    }

    // search field 
    handleChange(event) {
        this.setState({search: event.target.value}, this.filter);
    }

    // category field
    handleSubmit(event) {
        // value of category list
        let category = event.target.childNodes[0].value;
        this.setState({ category: category }, this.filter);
        event.preventDefault();
    }

    // filter products by search and category fields
    filter() {
        var url;
        if (this.state.category === "") {
            // no filter
            if (this.state.search === "") {
                this.componentDidMount();
                return;
            }
            // filter by search only
            else {
                url = baseUrl + 'product/search/' + this.state.search;
                  
            }
        }
        else {
            // filter by category only
            if (this.state.search === "") {
                url = baseUrl + 'product/category/' + this.state.category;
                  
            }
            // filter by category and search
            else {
                url = baseUrl + 'product/categorysearch/' + this.state.category
                    + '/' + this.state.search;
            }
        }
        this.getFilteredProducts(url);
    }

    //  get filtered products and set state
    getFilteredProducts(url) {
        axios.get(url).then(response => {
                this.setState({ products: response.data })
            })
    }
            
    render() {
        return (
            <div>
                <div className="navbar">
                    <span className="left">
                        <img src={Logo} alt="logo" id="logo"/>
                        <h2>Ministore</h2>
                    </span>
                    <span className="right">
                        <Account name={this.state.name} />
                    </span>
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <Categories />
                    <input id="posButton" type="submit" value="Submit" />
                    <br></br>
                    <input type="text" placeholder="Search..." onChange={this.handleChange} />
                </form>
                <Products products={this.state.products} />
            </div>
        )
    }

    componentDidMount() {
        axios.get(baseUrl + 'product/all').then(response => {
            this.setState({ products: response.data })
        })
        if (document.cookie) {
            let uname = getCookie('username');
            if (uname !== "") {
                axios.get(baseUrl + "user/name/" + uname).then(res => {
                    this.setState({ name: res.data })

                });
            }
        }
    }
}
export default Store