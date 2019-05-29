import React from 'react';
import axios from 'axios';

class AddNewEntry extends React.Component {
  url = "http://localhost:3000";

  getIngredients( ingredient_to_get ) {
    return new Promise((resolve, reject) => {
      return axios.get(this.url + `/${ingredient_to_get.key}`)
          .then(resp => resolve(resp.data))
          .catch(resp => alert("Could not load your ingredients"));
    });

  }

  getAllIngredients() {
    return new Promise((resolve, reject) => {
      return axios.get(this.url + `/all`)
          .then(resp => resolve(resp.data))
          .catch(resp => alert("Could not load your ingredients"));
    });
  }

  deleteIngredient( ingredient ){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/delete`, { key: ingredient.key })
          .then(resp => resolve(resp.data))
          .catch(resp => alert("Could not delete ingredient"));
  });
  }

  //ingredient is an object with text and tags
  addIngredient( ingredient ){
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/add`, { key: ingredient.var_key, tags: ingredient.var_tags })
          .then(resp => resolve(resp.data))
          .catch(resp => alert("Invalid Ingredient"));
  });
}
}

export default AddNewEntry;
