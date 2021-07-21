import React, { useEffect, useState } from "react";
import "./css/App.css";
import { Input } from "./components/Input";
import { Submit } from "./components/Submit";
import { Popup } from "./components/Popup";
import userArray from "./user-informations.json";

export const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [didClick, setDidClick] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (username.length < 3 || password.length < 3) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [username, password]);

  const verifyUser = () => {
    let account = userArray.find((user) => user.username === username);
    let message;

    if (account) {
      if (account.password === password) {
        setValidUser(true);
        message = "Succesfully logged in";
      } else {
        setValidUser(false);
        message = "Incorrect password";
      }
    } else {
      setValidUser(false);
      message = "User does not exist";
    }

    setLoginMessage(message);
  };

  return (
    <div className='signin-container'>
      <form>
        <Input
          cssClass='signin-input'
          input={username}
          setInput={setUsername}
          type='text'
          placeholder='username'
        />
        <Input
          cssClass='signin-input'
          input={password}
          setInput={setPassword}
          type='password'
          placeholder='password'
        />
        <Submit
          cssClass='signin-button'
          setDidClick={setDidClick}
          verifyUser={verifyUser}
          buttonDisabled={buttonDisabled}
        />
      </form>
      <Popup
        validUser={validUser}
        didClick={didClick}
        setDidClick={setDidClick}
        loginMessage={loginMessage}
      />
    </div>
  );
};
