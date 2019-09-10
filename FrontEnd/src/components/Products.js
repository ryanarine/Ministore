import React, { Component } from "react";
import Product from "./Product";
import "./styles/Products.css";
import axios from "axios";
import {
  baseUrl,
  errColor,
  successColor,
  CUSTOMER,
  setCrenditals,
  notAuthorized
} from "./Constants";
import HiddenMessage from "./HiddenMessage";
import InventoryManagement from "./InventoryManagement";

const deletedMsg =
  " has been successfully deleted. Refresh or use the search form to see the changes.";
const deleteMsg =
  "Click on a product to delete it. Click the Delete Product button again to cancel.";
const errMsg =
  " has already been deleted. Refresh or use the search form to see the changes.";
const normalMsg = "You have exited delete mode.";
var productItem = "";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      delete: false,
      classes: "grid",
      message: "",
      msgTime: 10,
      msgColor: "white",
      privledge: CUSTOMER + 1
    };
    this.clickedProduct = this.clickedProduct.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return { privledge: props.privledge };
  }

  // Handles what happens when a product is clicked
  clickedProduct(productId, productName) {
    if (this.state.delete) {
      const params = setCrenditals();
      params.append("id", productId);
      axios({
        method: "delete",
        url: baseUrl + "product/delete",
        data: params
      })
        .then(res => {
          if (res.data === 404) {
            this.setState({
              message: productName + errMsg,
              msgColor: errColor,
              msgTime: 10
            });
          } else {
            this.setState({
              message: productName + deletedMsg,
              msgColor: successColor,
              msgTime: 10
            });
          }
        })
        .catch(notAuthorized);
    }
  }

  changeMode() {
    // Enter Normal Mode
    if (this.state.delete) {
      this.setState({
        delete: false,
        classes: "grid",
        message: normalMsg,
        msgTime: 3,
        msgColor: "white"
      });
    }
    // Enter Delete Mode
    else {
      this.setState({
        delete: true,
        classes: "grid gridhover",
        message: deleteMsg,
        msgTime: -1,
        msgColor: "white"
      });
    }
  }

  render() {
    if (productItem.length !== this.props.products.length) {
      productItem = this.props.products.map((item, i) => {
        return (
          <Product
            key={item.id}
            name={item.name}
            category={item.category}
            weight={item.weight}
            price={item.price}
            click={() => this.clickedProduct(item.id, item.name)}
          />
        );
      });
    }
    return (
      <div>
        <InventoryManagement
          privledge={this.state.privledge}
          click={this.changeMode}
        />
        <HiddenMessage
          msg={this.state.message}
          time={this.state.msgTime}
          style={{ color: this.state.msgColor }}
        />
        <div className={this.state.classes}>{productItem}</div>
      </div>
    );
  }
}

export default Products;
