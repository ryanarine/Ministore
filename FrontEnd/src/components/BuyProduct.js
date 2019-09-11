import React, { Component } from "react";
import { setSessionItems, baseUrl, notLoggedIn, successColor, errColor } from "./Constants";
import HiddenMessage from "./HiddenMessage";
import axios from "axios";
var clickedForm;
class BuyProduct extends Component {
  constructor() {
    super();
    clickedForm = false;
    this.state = {
      modal: true,
      msg: "",
      msgColor: successColor
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setModalTrue = this.setModalTrue.bind(this);
    this.setModalFalse = this.setModalFalse.bind(this);
  }
  setModalTrue() {
    clickedForm = true;
    this.setState({ modal: true });
  }
  setModalFalse() {
    if (clickedForm) {
      clickedForm = false;
    } else {
      this.setState({ modal: false }, this.props.cancel);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let quantity = event.target.elements.quantity.value;
    if (quantity <= 0 || isNaN(quantity)) {
      alert("Invalid input");
      return;
    }
    quantity = Number(quantity).toFixed();
    const params = setSessionItems();
    params.append("id", this.props.product.id);
    params.append("quantity", quantity);
    axios({
      method: "post",
      url: baseUrl + "transaction/buy",
      data: params
    })
      .then(res => {
        if (res.data === 403) {
          this.setState({ msg: "You do not have enough money", msgColor: errColor });
        } else {
          let unitStr = quantity === "1" ? "unit" : "units";
          this.setState({
            msg: `Transaction complete! You bought ${quantity} ${unitStr} of ${
              this.props.product.name
            } for $${quantity * this.props.product.price}. Your remaining balance is $${
              res.data.wallet
            }`,
            msgColor: successColor
          });
        }
      })
      .catch(notLoggedIn);
  }

  render() {
    return (
      <div className="modal" onClick={this.setModalFalse}>
        <form className="modal-container" onSubmit={this.handleSubmit} onClick={this.setModalTrue}>
          <label> Are you sure you want to buy this product? </label>
          <label>
            {this.props.product.name} for ${this.props.product.price}
          </label>
          <label> Quantity </label>
          <input type="text" name="quantity" placeholder="0" />
          <HiddenMessage msg={this.state.msg} style={{ color: this.state.msgColor }} />
          <div>
            <input type="submit" value="Submit" className="posButton" />
            <button type="button" className="negButton" onClick={this.setModalFalse}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BuyProduct;
