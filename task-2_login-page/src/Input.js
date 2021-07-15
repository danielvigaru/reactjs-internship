import React, { useEffect, useState } from "react";

export const Input = (props) => {
  const [inputValid, setInputValid] = useState(true);
  const [validText, setValidText] = useState(null);

  useEffect(() => {
    inputValid
      ? setValidText(null)
      : setValidText("Please enter 3 or more characters");
  }, [inputValid]);

  return (
    <div>
      <input
        className={props.clss}
        placeholder={props.placeholder}
        type={props.type}
        value={props.input}
        onChange={(e) => onTextChange(e, props.setInput, setInputValid)}
      />
      {validText}
    </div>
  );
};

const onTextChange = (e, setValueCb, setValidCb) => {
  const text = e.target.value;
  setValueCb(text);

  if (text.length >= 3 || text.length === 0) {
    setValidCb(true);
  } else {
    setValidCb(false);
  }
};
