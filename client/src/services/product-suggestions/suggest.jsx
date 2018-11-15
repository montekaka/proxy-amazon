import React from 'react';
import axios from 'axios';
import SuggestItem from './suggestItem.jsx';
import PageHandler from './page-handler.jsx';
import css from './css/style.css';

const GET_PATH = 'http://localhost:3000/api/suggestions/products/';
const PRODUCT_GET_PATH = 'http://localhost:3000/api/products/';

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '2',
      displayData: [],
      currentPageNumber: 1,
      itemPerPage: 4,
      widgetWidth: 0,
      nextPage: 0,
      previousPage: 0
    };

    this.get = this.get.bind(this);
    this.handlePageActionClick = this.handlePageActionClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() { 
    this.setState({id: this.props.id}, () => {
      this.get();
    });    
    this.handleResize();
  }

  handlePageActionClick(num) {
    const currentPageNumber = this.state.currentPageNumber + Number(num);
    const _this = this;
    if (currentPageNumber > 0) {
      this.setState({currentPageNumber: currentPageNumber}, () => {
        _this.get();
      })
    } 
  }

  handleResize() {
    window.addEventListener("resize", () => {
      const widgetWidth = document.getElementById('widget-suggestions').clientWidth;
      console.log(widgetWidth);
    });
  }

  get() {
    const _this = this;
    const id = _this.state.id;
    const currentPageNumber = _this.state.currentPageNumber;
    const itemPerPage = _this.state.itemPerPage;  
    const limit = _this.state.limit;    
    const widgetWidth = document.getElementById('widget-suggestions').clientWidth;
    const getPath = GET_PATH + id;
    axios.get(getPath, {
      params: {
        itemPerPage: itemPerPage,
        currentPageNumber: _this.state.currentPageNumber
      }
    })
    .then((res) => {
      return res.data
    })
    .then((data) => {
      const suggestions = data['suggestions'];
      let promises = [];
      for (var i = 0; i < suggestions.length; i++) {
        var suggestProductPath = PRODUCT_GET_PATH+suggestions[i].suggestProductId;
        promises.push(axios.get(suggestProductPath));
      }
      axios.all(promises)
        .then(axios.spread((...args) => {
          let data = [];
          for (var j = 0; j < args.length; j++) {
            data.push(args[j].data[0]);
          }
          return data;
        }))
        .then((data) => {
          _this.setState({displayData: data, widgetWidth: widgetWidth})          
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h1>Suggest items</h1>
        <div id="widget-suggestions" className="suggestions-widget">     
          <PageHandler actionLabel="<" actionClassName='previous' pageNum="-1" clickHandler={this.handlePageActionClick}/>
          <div className="items">
            {
              this.state.displayData.map((item) => 
                <SuggestItem item={item} key={item.id}/>
              )          
            }
          </div>
          <PageHandler actionLabel=">" actionClassName='next' pageNum="1" clickHandler={this.handlePageActionClick}/>
        </div>
      </div>
    );
  }
}

export default Suggest;