import React from "react";
import Button from "react-bootstrap/Button";

export const Submit = ({
  cssClass,
  setDidClick,
  verifyUser,
  buttonDisabled,
}) => {
  return (
    <Button
      type='submit'
      bsPrefix={cssClass}
      onClick={(event) => {
        event.preventDefault();
        verifyUser();
        setDidClick(true);
      }}
      disabled={buttonDisabled}
    >
      sign in
    </Button>
  );
};
