import React from 'react'
import './App.css';
import _ from 'lodash';
import AddNewEntry from '../API/AddNewEntry';
import '../StringUtils.js';

const initialState = { // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",

      ingredientExist: false,

      text: "",

      tags: [] }

var ingredient = {};

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    var addnewentry = new AddNewEntry()
    addnewentry.getAllIngredients().then(res => {
              for (var i = 0; i < res.length; i++) {
                let objInner = {}
                objInner["text"] = res[i].text
                objInner["tags"] = res[i].tags
                ingredient[res[i].key] = objInner
              }
              console.log(ingredient)
    }).catch(err => {})
    this.onChange = this.onChange.bind(this);
  }

  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });

    setTimeout(() => {
      if ( ingredient[this.state.userInput.toHashKey()] )
      {
        var array = [];
        for (var i = 0; i < Object.keys(ingredient[this.state.userInput.toHashKey()].tags).length; i++) {
          array[i] = Object.keys(ingredient[this.state.userInput.toHashKey()].tags)[i];
        }
        this.setState({ ingredientExist: true });
        this.setState({ text: this.state.userInput.toHashKey() });
        this.setState({ tags: array });
      }
      else
      {
        const variations = this.state.userInput.toHashKey().getVariations();
        var found = false;
        for (var k = 0; k < variations.length; k++)
        {
          if ( ingredient[variations[k]] )
          {
            var array = [];
            for (var i = 0; i < Object.keys(ingredient[variations[k]].tags).length; i++) {
              array[i] = Object.keys(ingredient[variations[k]].tags)[i];
            }
            this.setState({ ingredientExist: true });
            this.setState({ text: variations[k] });
            this.setState({ tags: array });
            found = true;
            break;
          }
          if(!found)
          {
            this.setState({ ingredientExist: false });
          }         
        }   
      }
    }, 0); //Need to change to delay time if want to work with large database

  };

  
  onChange = (e) => {
    this.setState({ userInput: e.target.value });
    const suggestions = Object.keys(ingredient);
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toHashKey().toLowerCase()) > -1);

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });

    setTimeout(() => {
      if ( ingredient[this.state.userInput.toHashKey()] )
      {
        var array = [];
        for (var i = 0; i < Object.keys(ingredient[this.state.userInput.toHashKey()].tags).length; i++) {
          array[i] = Object.keys(ingredient[this.state.userInput.toHashKey()].tags)[i];
        }
        this.setState({ ingredientExist: true });
        this.setState({ text: this.state.userInput.toHashKey() });
        this.setState({ tags: array });
      }
      else
      {
        const variations = this.state.userInput.toHashKey().getVariations();
        var found = false;
        for (var k = 0; k < variations.length; k++)
        {
          if ( ingredient[variations[k]] )
          {
            var array = [];
            for (var i = 0; i < Object.keys(ingredient[variations[k]].tags).length; i++) {
              array[i] = Object.keys(ingredient[variations[k]].tags)[i];
            }
            this.setState({ ingredientExist: true });
            this.setState({ text: variations[k] });
            this.setState({ tags: array });
            found = true;
            break;
          }
          if(!found)
          {
            this.setState({ ingredientExist: false });
          }         
        }
      }
    }, 0); //Need to change to delay time if want to work with large database
  }

  render() {
    const {
  onChange,
  onClick,
  state: {
    activeSuggestion,
    filteredSuggestions,
    showSuggestions,
    userInput,
    ingredientExist,
    tags,
  }
} = this;

    let suggestionsListComponent;

        if (showSuggestions && userInput) {
          if (filteredSuggestions.length) {
            suggestionsListComponent = (
              <ul className="suggestions">
                {this.state.filteredSuggestions.map((suggestion, index) => {
                  let className;

                  // Flag the active suggestion with a class
                  if (index === activeSuggestion) {
                    className = "suggestion-active";
                  }

                  return (
                    <li className={className} key={suggestion} onClick={onClick}>
                      {suggestion}
                    </li>
                  );
                })}
              </ul>
            );
          } else {
            suggestionsListComponent = (
              <div className="no-suggestions">
                <em>No suggestions</em>
              </div>
            );
          }
        }

    return (
      <div>
      <div className = "center-div">
      <form onSubmit={this.onSubmit}>
      <input type="text"
      name = "search_ingredient"
      placeholder="Input Box"
      value = {userInput}
      onChange={onChange}
      />
      {suggestionsListComponent}
      </form>
      { this.state.ingredientExist ? (
        <div>
          {`Ingredient: ${this.state.text}`}
          <div>
          Tags:
          {
            this.state.tags.map((item, i) => {
              return(<span className="indent" key={i}>{` ${i === (this.state.tags.length - 1) ? item : `${item},`} `}</span>);
            })
          }
          </div>
        </div>
        ):
        (
          null
        )
        }
      </div>
      </div>
    )
  }
}
