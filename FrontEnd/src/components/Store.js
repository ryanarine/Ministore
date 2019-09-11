import React, { Component } from "react";
import axios from "axios";
import Products from "./Products";
import Categories from "./Categories";
import Account from "./Account";
import { baseUrl, CUSTOMER, getCredentials } from "./Constants";
import Logo from "../pictures/logo.PNG";

const formStyle = {
  width: "30vw",
  minWidth: "300px",
  display: "grid",
  gridTemplateColumns: "65% 35%"
};

const searchBarStyle = {
  gridColumn: "1 / 3"
};

class Store extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      category: "",
      search: "",
      name: "",
      privledge: CUSTOMER + 1,
      wallet: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filter = this.filter.bind(this);
    this.getFilteredProducts = this.getFilteredProducts.bind(this);
  }

  // search field
  handleChange(event) {
    this.setState({ search: event.target.value }, this.filter);
  }

  // category field
  handleSubmit(event) {
    // value of category list
    let category = event.target.elements.category.value;
    if (category !== this.state.category) {
      this.setState({ category: category }, this.filter);
    }
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
        url = baseUrl + "product/search/" + this.state.search;
      }
    } else {
      // filter by category only
      if (this.state.search === "") {
        url = baseUrl + "product/category/" + this.state.category;
      }
      // filter by category and search
      else {
        url = baseUrl + "product/categorysearch/" + this.state.category + "/" + this.state.search;
      }
    }
    this.getFilteredProducts(url);
  }

  //  get filtered products and set state
  getFilteredProducts(url) {
    axios.get(url).then(response => {
      this.setState({ products: response.data });
    });
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <img src={Logo} alt="logo" id="logo" className="left" />
          <h2 className="left">Ministore</h2>
          <Account name={this.state.name} wallet={this.state.wallet} />
        </div>

        <form onSubmit={this.handleSubmit} style={formStyle}>
          <Categories />
          <input className="posButton" type="submit" value="Submit" />
          <input
            type="text"
            placeholder="Search..."
            onChange={this.handleChange}
            style={searchBarStyle}
          />
        </form>
        <Products
          products={this.state.products}
          category={this.state.category}
          search={this.state.search}
          privledge={this.state.privledge}
        />
      </div>
    );
  }

  componentDidMount() {
    axios.get(baseUrl + "product/all").then(response => {
      this.setState({ products: response.data });
    });
    let credentials = getCredentials();
    if (credentials) {
      credentials.then(data =>
        this.setState({
          name: data.name,
          privledge: data.privledge,
          wallet: data.wallet
        })
      );
    }
  }
}
export default Store;
