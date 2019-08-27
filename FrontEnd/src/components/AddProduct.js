import React, { Component } from 'react';
import Categories from './Categories';
import axios from 'axios';
import {baseUrl} from './Constants';

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let name = event.target.elements.name.value;
        let category = event.target.elements.category.value;
        let price = event.target.elements.price.value;
        let weight = event.target.elements.weight.value;
        let unit = event.target.elements.unit.value;
        if (isNaN(price) || isNaN(weight)){
            alert("Invalid Input");
            event.preventDefault();
        }
        else {
            price =  "$" + Number(price).toFixed(2);
            weight = Number(weight).toFixed(2) + unit;
            const params = new URLSearchParams();
            params.append('name', name);
            params.append('category', category);
            params.append('price', price);
            params.append('weight', weight);
            axios({
            method: 'post',
            url: baseUrl + 'product/add',
            data: params,
            }).then(() => alert("Product has been successfully added"));
        }
    }

    render() {
        if (this.state.modal) {
            return (
                <form className="modal" onSubmit={this.handleSubmit}>
                    <div className="modal-container">
                        <label> Product Name
				<input type="text" name="name" required />
                        </label>
                        <label> Product Category <br></br>
                            <Categories noDefault="true" />
                            <br></br></label>
                        <label> Product Price ($)
				<input type="text" name="price" required />
                        </label>
                        <label> Product Weight
				<input type="text" name="weight" required />
                        </label>
                        <label> Weight unit
                            <label> <input type="radio" name="unit" value="g" required />g</label>
                            <label> <input type="radio" name="unit" value="kg" />kg</label>
                            <label> <input type="radio" name="unit" value="lbs" />lbs</label>
                            <label> <input type="radio" name="unit" value="oz" />oz</label>
                        </label>
                            <input type="submit" value="Submit" id="posButton" />
                            <input type="submit" value="Cancel" id="negButton" onClick={() => this.setState({ modal: false })} />
                    </div>
                </form>
            )
        }
        return (
            <button id="posButton" onClick={() => this.setState({modal: true})}>Add Product</button>
        );
    }
}

export default AddProduct