import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductComp = props => (
    <tr>
        <td>{props.product.productName}</td>
        <td>{props.product.productDescription}</td>
        <td>{props.product.productPrice}</td>
        <td>{props.product.productCategory}</td>
        <td>
            <Link to={"/edit/"+props.product._id}>Edit</Link> | <a href="/#" onClick={() => props.deleteProduct(props.product._id)}>Delete</a>
        </td>
    </tr>

)


export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/product/')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
            .catch(error => {
                console.log('error: ' + error)
            })
    }


    deleteProduct(id) {
        axios.delete('http://localhost:5000/product/' + id)
            .then(res => console.log(res.data))

        this.setState({
            products: this.state.products.filter(el => el._id !== id)
        })
    }

    productList() {
        return this.state.products.map(currentproduct => {
            return <ProductComp product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>ProductList</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                            <th>Product category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.productList()}
                    </tbody>
                </table>
            </div>
        )
    }
}