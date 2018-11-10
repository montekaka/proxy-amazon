import React from 'react';
import ReactDOM from 'react-dom';
import Suggest from './services/product-suggestions/suggest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: 1, // make this dynamic later
    }
  }

  render() {
    return (
      <div className="container">
        <Suggest id={this.state.itemID}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));