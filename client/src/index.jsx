import React from 'react';
import ReactDOM from 'react-dom';
import Suggest from './services/product-suggestions/suggest.jsx';
import ReviewsContainer from './services/reviews/components/ReviewsContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1, // make this dynamic later
      itemID: 1, // make this dynamic later
    }
  }

  render() {
    return (
      <div className="container">
        <ProductDescription id={this.state.itemID}/>
        <Suggest id={this.state.itemID}/>
        <ReviewsContainer itemID={this.state.itemID} userID={this.state.itemID} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));