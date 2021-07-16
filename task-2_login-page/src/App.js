import React, { useState } from "react";
import "./css/App.css";
import { Input } from "./components/Input";
import { Submit } from "./components/Submit";
import userArray from "./user-informations.json";

export const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='signin-container'>
      <Input
        clss='signin-input'
        input={username}
        setInput={setUsername}
        type='text'
        placeholder='username'
      />

      <Input
        clss='signin-input'
        input={password}
        setInput={setPassword}
        type='password'
        placeholder='password'
      />

      <Submit
        clss='signin-button'
        userArray={userArray}
        username={username}
        password={password}
      />
    </div>
  );
};
