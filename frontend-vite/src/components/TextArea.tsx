// @ts-ignore
import React from "react";

// @ts-ignore
const TextArea = ({ value, onChange, placeholder, className = '', ...props }) => (
  <textarea
    className={`textarea ${className}`}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    {...props}
  />
)

export default TextArea
