import React, { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";

export const Input = ({ cssClass, input, setInput, type, placeholder }) => {
  const [inputValid, setInputValid] = useState(true);
  const [validText, setValidText] = useState(null);

  useEffect(() => {
    inputValid
      ? setValidText(null)
      : setValidText("Please enter 3 or more characters");
  }, [inputValid]);

  const onTextChange = (event) => {
    const text = event.target.value;
    setInput(text);

    if (text.length >= 3 || text.length === 0) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  };

  return (
    <>
      <FormControl
        bsPrefix={cssClass}
        placeholder={placeholder}
        type={type}
        value={input}
        onChange={(event) => onTextChange(event)}
      />
      {validText}
    </>
  );
};
