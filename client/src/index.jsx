import React from 'react';
import ReactDOM from 'react-dom';
import Suggest from './services/product-suggestions/suggest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Suggest id={1}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));