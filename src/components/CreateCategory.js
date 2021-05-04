import axios from 'axios';
import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default class CreateCategory extends Component {
    constructor(props) {
        super(props);

        this.onChangeCreateCategory = this.onChangeCreateCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categoryName : ''
        }
    }


    onChangeCreateCategory(e) {
        this.setState({
            categoryName: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const category = {
            categoryName: this.state.categoryName
        }

        console.log(category);
        axios.post('http://localhost:5000/category/add',category)
            .then(res => console.log(res.data));

        this.setState ({
            categoryName : ''
        })
    }
    
    render() {
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Control placeholder="Create Category" type="text" value={this.state.categoryName} onChange={this.onChangeCreateCategory} />
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