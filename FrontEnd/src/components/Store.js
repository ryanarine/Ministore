import React, { Component } from "react";
import axios from "axios";
import Products from "./Products";
import Categories from "./Categories";
import Account from "./Account";
import { baseUrl, CUSTOMER } from "./Constants";
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
      privledge: CUSTOMER + 1
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
        url =
          baseUrl +
          "product/categorysearch/" +
          this.state.category +
          "/" +
          this.state.search;
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
          <span className="left">
            <img src={Logo} alt="logo" id="logo" />
            <h2>Ministore</h2>
          </span>
          <span className="right">
            <Account name={this.state.name} />
          </span>
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
          privledge={this.state.privledge}
        />
      </div>
    );
  }

  componentDidMount() {
    axios.get(baseUrl + "product/all").then(response => {
      this.setState({ products: response.data });
    });
    let uname = sessionStorage.getItem("username");
    let hash = sessionStorage.getItem("hash");
    if (uname && hash) {
      axios({
        method: "get",
        url: baseUrl + "user/credentials/" + uname + "/" + hash
      }).then(res => {
        if (res.data.privledge !== -1) {
          this.setState({ name: res.data.name, privledge: res.data.privledge });
        }
      });
    }
  }
}
export default Store;
