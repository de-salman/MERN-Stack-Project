import axios from 'axios';
import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';


export default class EditProduct extends Component {
    constructor(props) {
        super(props);


        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductCategory = this.onChangeProductCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            productName: '',
            productDescription: '',
            productPrice: '',
            productCategory: '',
            category: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/product/608dc0cc2cbd1033ec4db37e')
            .then(res => {
                this.setState({
                    productName: res.data.productName,
                    productDescription: res.data.productDescription,
                    productPrice: res.data.productPrice,
                    productCategory: res.data.productCategory,
                })
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.get('http://localhost:5000/category')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        category: res.data.map(category => category.categoryName),
                    })
                }
            })

    }

    onChangeProductDescription(e) {
        this.setState({
            productDescription: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            productPrice: e.target.value
        });
    }

    onChangeProductName(e) {
        this.setState({
            productName: e.target.value
        });
    }

    onChangeProductCategory(e) {
        this.setState({
            productCategory: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const product = {
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            productCategory: this.state.productCategory,
        }

        axios.post('http://localhost:5000/product/update/'+this.props.match.params.id, product)
            .then(res => console.log(res.data));
        console.log(product);
    }

    render() {
        return (
            <div>
                <h1>Edit Product Here</h1>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Control placeholder="Product Name" type="text" value={this.state.productName} onChange={this.onChangeProductName} />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Control placeholder="Product Price" type="number" value={this.state.productPrice} onChange={this.onChangeProductPrice} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Control as="select" value={this.state.productCategory} onChange={this.onChangeProductCategory}>
                                {
                                    this.state.category.map(function (category) {
                                        return <option key={category} value={category}>
                                            {category}
                                        </option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Control placeholder="Product Description" type="text" value={this.state.productDescription} onChange={this.onChangeProductDescription} />
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}