// Import ReactDOM and React
import React from 'react';
import _ from 'lodash';
import SearchBox from './SearchBox';
import AddBox from './AddBox';
import './App.css';

var initialState = {
  searchBox: false,
  addBox: false
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  state = initialState;

  onClickSearchBox = (e) => {
    this.setState({
    searchBox: !this.state.searchBox
    });
      if(this.state.addBox){
        this.setState({ addBox: !this.state.addBox })
      }
  }

  onClickAddBox = (e) => {
    this.setState({
    addBox: !this.state.addBox
    });
    if(this.state.searchBox){
      this.setState({ searchBox: !this.state.searchBox })
    }
  }

  render() {
    return (
      <div>
      <h1 className = "heading">Welcome, this is Healy Coding Challenge
      <h1 className = "heading">Choose one of the below modes</h1>
      </h1>
      <div className = "left-center">
      <button onClick={this.onClickSearchBox}>Search for Ingredient</button>
      <button onClick={this.onClickAddBox}>Add Ingredient</button>
      </div>
      { this.state.searchBox ? (
        <div>
        <SearchBox/>
        </div>
      ): this.state.addBox ? (
        <div>
        <AddBox/>
        </div>
      ):
        (
          null
        )
        }
      </div>
    );
  }
}
