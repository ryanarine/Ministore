import React, { Component } from "react";
import Categories from "./Categories";
import axios from "axios";
import { baseUrl, successColor } from "./Constants";
import "./styles/Modal.css";
import HiddenMessage from "./HiddenMessage";

const addMsg =
  " has been successfully added. Add another product or use the search form to see the changes.";

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      msg: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setModalTrue = this.setModalTrue.bind(this);
    this.setModalFalse = this.setModalFalse.bind(this);
  }

  setModalTrue() {
    this.setState({ modal: true });
  }
  setModalFalse() {
    this.setState({ modal: false, msg: "" });
  }

  handleSubmit(event) {
    event.preventDefault();
    let name = event.target.elements.name.value;
    let category = event.target.elements.category.value;
    let price = event.target.elements.price.value;
    let weight = event.target.elements.weight.value;
    let unit = event.target.elements.unit.value;
    if (isNaN(price) || isNaN(weight)) {
      alert("Invalid Input");
    } else {
      price = "$" + Number(price).toFixed(2);
      weight = Number(weight).toFixed(2) + unit;
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("category", category);
      params.append("price", price);
      params.append("weight", weight);
      axios({
        method: "post",
        url: baseUrl + "product/add",
        data: params
      }).then(() => this.setState({ msg: name + addMsg }));
    }
  }

  render() {
    if (this.state.modal) {
      return (
        <div className="modal" onClickCapture={this.setModalFalse}>
          <form
            className="modal-container"
            onSubmit={this.handleSubmit}
            onClickCapture={this.setModalTrue}
          >
            <label> Product Name </label>
            <input type="text" name="name" required />
            <label> Product Category </label>
            <Categories noDefault="true" />
            <label> Product Price ($) </label>
            <input type="text" name="price" required />
            <label> Product Weight </label>
            <input type="text" name="weight" required />
            <label> Weight unit </label>
            <br></br>
            <input type="radio" name="unit" value="g" required />
            <label> g</label>
            <input type="radio" name="unit" value="kg" />
            <label>kg</label>
            <input type="radio" name="unit" value="lbs" />
            <label>lbs</label>
            <input type="radio" name="unit" value="oz" />
            <label>oz</label>
            <HiddenMessage
              msg={this.state.msg}
              style={{ color: successColor }}
            />
            <input type="submit" value="Submit" className="posButton" />
            <button
              type="button"
              className="negButton"
              onClick={this.setModalFalse}
            >
              Cancel
            </button>
          </form>
        </div>
      );
    }
    return (
      <button
        className="posButton"
        onClick={() => this.setState({ modal: true })}
      >
        Add Product
      </button>
    );
  }
}

export default AddProduct;
