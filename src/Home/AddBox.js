//AddBox.js

import React from 'react';
import './App.css';
import AddNewEntry from '../API/AddNewEntry';
const initialState = { key: '', tags: {}, tagArr: [{ tag_key: "", tag_value: "" }]}
export default class AddBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  addnewentry = new AddNewEntry();

  onSubmit = (e) => {
    e.preventDefault();
    let obj = {};
    for (var i = 0; i < this.state.tagArr.length; i++) {
      obj[this.state.tagArr[i].tag_key] = this.state.tagArr[i].tag_value;
    }
    var ingredient_to_add = {
      var_key: this.state.key,
      var_tags: obj
    }

    this.addnewentry.addIngredient(ingredient_to_add).then(res => {
    }).catch(err => {
    })

    this.setState({ tagArr: [{ tag_key: "", tag_value: "" }] });
    this.setState({ key: '' })
  }

  onClickAddMoreTag = (e) => {
    this.setState({
      tagArr: this.state.tagArr.concat([{ tag_key: "", tag_value: "" }])
    });
  }

  onChangeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleTagChange = index => (e) => {
    const newTagArr = this.state.tagArr.map((aTag, anIndex) => {
      if (index !== anIndex) return aTag;
      return { ...aTag, [e.target.name]: e.target.value }
    });

    this.setState({ tagArr: newTagArr });
  }


  render() {
    return (
      <div>
        <div className = "center-div">
          <form onSubmit={this.onSubmit}>
            <input type="text"
            name = "key"
            placeholder="Ingredient Name/Key"
            value = {this.state.key}
            onChange={this.onChangeValue}
            />
            {this.state.tagArr.map((aTag, anIndex) => (
              <div>
              <input type="text"
              name = "tag_key"
              placeholder={`TagKey for Tag #${anIndex + 1}`}
              value = {aTag.tag_key}
              onChange={this.handleTagChange(anIndex)}
              />
              <input type="text"
              name = "tag_value"
              placeholder={`TagValue for Tag #${anIndex + 1}`}
              value = {aTag.tag_value}
              onChange={this.handleTagChange(anIndex)}
              />
              </div>
            ))}
            <button>Submit</button>
          </form>
          <button onClick = {this.onClickAddMoreTag}>Add More Tag</button>
        </div>
      </div>
    )
  }
}