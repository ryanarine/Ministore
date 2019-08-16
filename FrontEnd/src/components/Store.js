import React, { Component } from 'react';
import axios from 'axios';
import Products from './Products';
import Categories from './Categories';
import Account from './Account';

function toByteArray(str) {
    var res = [];
    for (let i = 0; i < str.length; i++) {
        res.push(str.charCodeAt(i));
    }
    return res;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
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
            modal: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filter = this.filter.bind(this);
        this.getFilteredProducts = this.getFilteredProducts.bind(this);
        this.handleAccount = this.handleAccount.bind(this);
        this.setModalFalse = this.setModalFalse.bind(this);
        this.setModalTrue = this.setModalTrue.bind(this);
    }

    setModalFalse() {
        this.setState({modal: false})
    }

    setModalTrue() {
        this.setState({ modal: true })
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

    handleAccount(event) {
        let username = event.target.childNodes[0].value;
        let password = toByteArray(event.target.childNodes[3].value);
        let name = event.target.childNodes[6].value;
        axios.post('http://localhost:8080/user/add', { username: username, password: password, name: name }, { headers: { 'Content-Type': "application/json" } })
            .then(res => {
                if (res.data === 401) {
                    alert("Username has already been taken");
                }
            });
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
        return (
            <div>
                <div className="navbar">
                    <h2 id="title">Ministore</h2>
                    <Account name={this.state.name} setModalTrue={this.setModalTrue} />
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <Categories />
                    <input type="submit" value="Submit" />
                    <br></br>
                    <input type="text" placeholder="Search" onChange={this.handleChange} />
                </form>
                <Products products={this.state.products} />
            </div>
        )
    }

    componentDidMount() {
        axios.get('http://localhost:8080/product/all').then(response => {
            this.setState({ products: response.data })
        })
        let uname = getCookie('username');
        axios.get("http://localhost:8080/user/name/" + uname).then(res => {
            this.setState({ name: res.data })
            
        });
    }
}
export default Store