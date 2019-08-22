import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from './Constants';

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get(baseUrl + 'category/all').then(response => {
            this.setState({ categories: response.data }, () => {
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
            <select name="category">
                <option value="">All Categories</option>
                {categoryItem}
            </select>
        )
    }
}

export default Categories