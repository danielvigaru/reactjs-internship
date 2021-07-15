import Lottie from "react-lottie";
import checkAnimationData from "./lotties/checkmark.json";
import xAnimationData from "./lotties/xmark.json";

export const Popup = (props) => {
  let animationData;

  if (props.didClick) {
    if (props.validUser) {
      animationData = checkAnimationData;
    } else {
      animationData = xAnimationData;
    }
  } else {
    return null;
  }

  const options = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={options} height={30} width={30} /> {props.loginMessage}
    </div>
  );
};
