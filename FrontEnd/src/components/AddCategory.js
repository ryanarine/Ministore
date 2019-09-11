import React, { Component } from "react";
import axios from "axios";
import {
  baseUrl,
  errColor,
  successColor,
  msgWeight,
  setSessionItems,
  notAuthorized
} from "./Constants";
import "./styles/Modal.css";
import HiddenMessage from "./HiddenMessage";

const addMsg =
  " has been successfully added. Add another category or refresh the page to see the changes.";
const errMsg = " is already a category. Please select a different name.";

class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      msg: "",
      color: ""
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
    const params = setSessionItems();
    params.append("name", name);
    axios({
      method: "post",
      url: baseUrl + "category/add",
      data: params
    })
      .then(res => {
        if (res.data === 409) {
          this.setState({ msg: name + errMsg, color: errColor });
        } else {
          this.setState({ msg: name + addMsg, color: successColor });
        }
      })
      .catch(notAuthorized);
  }

  render() {
    if (this.state.modal) {
      return (
        <div className="modal" onClickCapture={this.setModalFalse}>
          <form
            autoComplete="off"
            className="modal-container"
            onSubmit={this.handleSubmit}
            onClickCapture={this.setModalTrue}
          >
            <label> Category Name </label>
            <input type="text" name="name" required />
            <br></br>
            <HiddenMessage
              style={{ color: this.state.color, fontWeight: msgWeight }}
              msg={this.state.msg}
            />
            <input type="submit" value="Add Category" className="posButton" />
            <button type="button" className="negButton" onClick={this.setModalFalse}>
              Cancel
            </button>
          </form>
        </div>
      );
    }
    return (
      <button className="posButton" onClick={() => this.setState({ modal: true })}>
        Add Category
      </button>
    );
  }
}

export default AddCategory;
