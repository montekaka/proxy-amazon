import React, { Component } from 'react';
import Details from './Details.jsx';
import Keywords from './Keywords.jsx';
import '../style.css';

class ProductDescription extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Product Description</h1>
        <Keywords />
        <Details />
      </div>
    );
  }
}

export default ProductDescription;
