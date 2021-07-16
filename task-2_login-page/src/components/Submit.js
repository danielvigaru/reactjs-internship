import React, { useEffect, useState } from "react";
import { Popup } from "./Popup";
import Button from "react-bootstrap/Button";

export const Submit = (props) => {
  const [validUser, setValidUser] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [didClick, setDidClick] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    if (props.username.length < 3 || props.password.length < 3) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [props.username, props.password]);

  return (
    <div>
      <Button
        type='submit'
        bsPrefix={props.clss}
        onClick={() => {
          verifyUser(
            props.userArray,
            props.username,
            props.password,
            setValidUser,
            setLoginMessage
          );
          setDidClick(true);
        }}
        disabled={buttonDisabled ? true : ""}
      >
        sign in
      </Button>

      <Popup
        validUser={validUser}
        didClick={didClick}
        setDidClick={setDidClick}
        loginMessage={loginMessage}
      />
    </div>
  );
};

const verifyUser = (
  usersArray,
  username,
  password,
  validUserCb,
  loginMessageCb
) => {
  let account = usersArray.find((user) => user.username === username);
  let message;

  if (account) {
    if (account.password === password) {
      validUserCb(true);
      message = "Succesfully logged in";
    } else {
      validUserCb(false);
      message = "Incorrect password";
    }
  } else {
    validUserCb(false);
    message = "User does not exist";
  }

  loginMessageCb(message);
};
