import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Product List</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Product</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/category" className="nav-link">Create Category</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/edit" className="nav-link">Edit Product</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}