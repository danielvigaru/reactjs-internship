import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import checkAnimationData from "../lotties/checkmark.json";
import xAnimationData from "../lotties/xmark.json";
import Alert from "react-bootstrap/Alert";

export const Popup = ({ validUser, didClick, setDidClick, loginMessage }) => {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [animationData, setAnimationData] = useState();

  const options = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (didClick) {
      if (validUser) {
        setVariant("success");
        setAnimationData(checkAnimationData);
      } else {
        setVariant("danger");
        setAnimationData(xAnimationData);
      }
      setShow(true);
    }
    setDidClick(false);
  }, [didClick, validUser, setDidClick]);

  return (
    <Alert
      show={show}
      onClose={() => setShow(false)}
      variant={variant}
      transition={true}
      id='alert-custom-override'
      // dismissible // i cannot style the close button correctly for some reason so it's disabled for now
    >
      <Lottie options={options} height={30} width={30} /> {loginMessage}
    </Alert>
  );
};
