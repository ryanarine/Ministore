import React, { Component } from 'react';
import axios from 'axios';
import {baseUrl, errColor, successColor, msgWeight} from './Constants';
import './Modal.css';
import HiddenMessage from './HiddenMessage';
import Categories from './Categories';

const addMsg = " has been successfully deleted. Delete another category or refresh the page to see the changes.";
const conflictMsg = "You can only delete a category if there are no products belonging to it.";
const errMsg = " has already been deleted. Delete another category or refresh the page to see the changes.";

class DelCategory extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            msg: "",
            color: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setModalTrue = this.setModalTrue.bind(this);
        this.setModalFalse = this.setModalFalse.bind(this);
    }

    setModalTrue() {
        this.setState({modal: true});
    }
    setModalFalse() {
        this.setState({modal: false, msg: ""});
    }

    handleSubmit(event) {
        event.preventDefault();
        let category = event.target.elements.category.value;
        const params = new URLSearchParams();
        params.append('name', category);
        axios({
        method: 'delete',
        url: baseUrl + 'category/delete',
        data: params,
        }).then(res => {
            if (res.data === 403) {
                this.setState({msg: conflictMsg, color: errColor});
            }
            else if (res.data === 412) {
                this.setState({msg: category + errMsg, color: errColor});
            }
            else {
                this.setState({msg: category + addMsg, color: successColor});
            }
        });
        
    }

    render() {
        if (this.state.modal) {
            return (
                <div className="modal" onClickCapture={this.setModalFalse}>
                    <form className="modal-container" onSubmit={this.handleSubmit} onClickCapture={this.setModalTrue}>
                        <label> Category Name </label>
				        <Categories noDefault="true"/>
                        <br></br>
                        <HiddenMessage style={{color: this.state.color, fontWeight: msgWeight}} msg={this.state.msg} />
                        <input type="submit" value="Delete" id="posButton" />
                        <button type="button" id="negButton" onClick={this.setModalFalse}>Cancel</button>
                    </form>
                </div>
            )
        }
        return (
            <button id="negButton" onClick={() => this.setState({modal: true})}>Delete Category</button>
        );
    }
}

export default DelCategory