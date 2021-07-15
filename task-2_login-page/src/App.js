import React, { useEffect, useState } from "react";
import "./css/App.css";
import { Input } from "./Input";
import { Submit } from "./Submit";

export const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    fetch("user-informations.json")
      .then((resp) => resp.json())
      .then((data) => setUserArray(data));
  }, []);

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
