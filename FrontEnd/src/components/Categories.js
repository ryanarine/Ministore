import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/category/all').then(response => {
            this.setState({ categories: response.data }, () => {
                //console.log(this.state);
            })
        })
    }

    render() {
        var categoryItem = this.state.categories.map((item, i) => {
            return (
                <option key={item.name} value={item.name}>{item.name}</option>
            )
        })

        return (
            <select name="category" onChange={this.handleChange}>
                <option value="">All Categories</option>
                {categoryItem}
            </select>
        )
    }
}

export default Categories