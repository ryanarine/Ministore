import React, { Component } from 'react';
import Product from './Product';
import './Products.css';
import AddProduct from './AddProduct';
import axios from 'axios';
import {baseUrl} from './Constants';

class Products extends Component {
    constructor(){
        super();
        this.state = {
            delete: false,
            classes: "grid"
        };
        this.clickedProduct = this.clickedProduct.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }

    // Handles what happens when a product is clicked
    clickedProduct(productId) {
        if (this.state.delete){
            const params = new URLSearchParams();
            params.append('id', productId);
            axios({
            method: 'delete',
            url: baseUrl + 'product/delete',
            data: params,
            }).then(() => {alert("Product has been successfully deleted. Refresh to see changes.")});
        }
    }

    changeMode() {
        // Enter Normal Mode
        if (this.state.delete){
            this.setState({delete: false, classes: "grid"});
        }
        // Enter Delete Mode
        else{
            this.setState({delete: true, classes: "grid gridhover"}, () => alert("Click on a product to delete it. Click the button again to cancel."))
        }
    }
    
    render() {
        var productItem = this.props.products.map((item, i) => {
            return (
                <Product key={item.id} name={item.name} category={item.category} weight={item.weight} price={item.price} click={() => this.clickedProduct(item.id)}/>
            )
        });
        return (
            <div>
                <AddProduct />
                <button id="negButton" onClick={this.changeMode}>Delete Product</button>
                <div className={this.state.classes}>
                    {productItem}
                </div>
            </div>
        );
    }

}

export default Products;