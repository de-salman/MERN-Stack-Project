import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ProductList from './components/ProductList';
import EditProduct from './components/EditProduct';
import CreateProduct from './components/CreateProduct';
import CreateCategory from './components/CreateCategory';



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ProductList} />
        <Route path="/edit" component={EditProduct} />
        <Route path="/create" component={CreateProduct} />
        <Route path="/category" component={CreateCategory} />
      </div>
    </Router>
  );
}

export default App;
