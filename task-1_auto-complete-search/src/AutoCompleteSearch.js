import React from "react";
import "./AutoCompleteSearch.css";

export default class AutoCompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTextCountry: "",
      countries: null,
      suggestions: null,
    };
  }

  componentDidMount() {
    fetch("countries.json")
      .then((response) => response.json())
      .then((data) => this.setState({ countries: data }));
  }

  onTextChanged = (event) => {
    const text = event.target.value;
    let suggestions = [];

    if (text.length > 0) {
      const regex = new RegExp(`${text}`, "i"); // match the word case insensitive
      suggestions = this.state.countries
        .sort()
        .filter((country) => regex.test(country.name));
    } else {
      suggestions = null;
    }

    this.setState({ suggestions: suggestions, inputTextCountry: text });
  };

  suggestionSelected(value) {
    this.setState({
      inputTextCountry: value,
      suggestions: null,
    });
  }

  createSuggestionsListElements = (suggestions) => {
    return suggestions?.map((country, index) => (
      <li
        key={index}
        onClick={() => {
          this.suggestionSelected(country.name);
        }}
      >
        {country.name}
      </li>
    ));
  };

  render() {
    return (
      <div className='auto-complete-search'>
        <input
          value={this.state.inputTextCountry}
          onChange={this.onTextChanged}
          placeholder='country'
          type='text'
        />
        <ul>{this.createSuggestionsListElements(this.state.suggestions)}</ul>
      </div>
    );
  }
}
