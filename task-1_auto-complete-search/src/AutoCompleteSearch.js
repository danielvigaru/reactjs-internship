import React from "react";
import "./AutoCompleteSearch.css";

export default class AutoCompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      countries: null,
      suggestions: null,
    };
  }

  componentDidMount() {
    fetch("countries.json")
      .then((response) => response.json())
      .then((data) => this.setState({ countries: data }));
  }

  onTextChanged = (e) => {
    const text = e.target.value;
    let suggestions = [];

    if (text.length > 0) {
      const regex = new RegExp(`${text}`, "i"); // match the word case insensitive
      suggestions = this.state.countries
        .sort()
        .filter((country) => regex.test(country.name));
    } else {
      suggestions = null;
    }

    this.setState({ suggestions: suggestions, input: text });
  };

  suggestionSelected(value) {
    this.setState({
      input: value,
      suggestions: null,
    });
  }

  render() {
    return (
      <div className='AutoCompleteSearch'>
        <input
          value={this.state.input}
          onChange={this.onTextChanged}
          placeholder='country'
          type='text'
        />
        <ul>
          {this.state.suggestions?.map((country) => (
            <li
              onClick={() => {
                this.suggestionSelected(country.name);
              }}
            >
              {country.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
