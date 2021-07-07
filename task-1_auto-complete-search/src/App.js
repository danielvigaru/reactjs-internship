import React from "react";
import AutoCompleteSearch from "./AutoCompleteSearch";
import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <div className='search'>
        <AutoCompleteSearch />
      </div>
    );
  }
}
