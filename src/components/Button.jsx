import React from "react";
import "./Button.css";

export default (props) => (
  <button
    className={`button ${props.operation ? "operation" : ""}`}
    style={{
      gridColumn: "span " + props.span || "span 1",
    }}
    onClick={(e) => props.click && props.click(props.label)}
  >
    {props.label}
  </button>
);
