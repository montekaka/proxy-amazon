import React, { Component } from 'react';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: '',
      productColor: '',
      packagingType: '',
      productSize: '',
      productImage: '',
    }
  }

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails() {
    let that = this;
    
    fetch(`/${5}/description`) // TODO: update for proxy
    .then(function(response) {
      return response.json();
    })
    .then(function(details) {
      console.log('This is where the response goes', details);

      that.setState({
        details: details.details,
        productColor: details.product_color,
        packagingType: details.packaging_type_label,
        productSize: details.product_size || 'N/A',
        productImage: details.product_image_url,
      });
    });
  }

  render() {
    return (
      <div>
        {
          this.state.packagingType &&
          <h2>Packaging Type: {this.state.packagingType}</h2>
        }
        {
          this.state.productSize &&
          <h2>Product Size: {this.state.productSize}</h2>
        }
        {
          this.state.productColor &&
          <h2>Product Color: {this.state.productColor}</h2>
        }
        <p>{this.state.details}</p>
        {
          this.state.productImage &&
          <img src={this.state.productImage} alt="Description Picture"/>
        }
      </div>
    );  
  }
}

export default Details;
