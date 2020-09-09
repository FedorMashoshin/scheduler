import React from "react";
import classNames from "classnames/bind";
import styles from "components/Button.scss";

let classnames = classNames.bind(styles);

export default function Button(props) {
  // button is required class but others are optional
  const buttonClass = classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
