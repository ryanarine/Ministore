import React, { Component } from 'react';

class Product extends Component {
    constructor(props) {
        super();
        this.state = {
            name: props.name,
            weight: props.weight,
            category: props.category,
            price: props.price
        }
    }
    render() {
        return (
            <ul onClick={this.props.click}>
                <li>{"Name: " + this.state.name}</li>
                <li>{"Category: " + this.state.category}</li>
                <li>{"Price: " + this.state.price}</li>
                <li>{"Weight: " + this.state.weight}</li>
                    
            </ul>
        )
    }
}

export default Product;