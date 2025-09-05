// @ts-ignore
import React from "react";

// @ts-ignore
const Button = ({ children, onClick, disabled, variant = 'primary', size = 'md', className = '', ...props }) => (
  <button className={`btn btn-${variant} btn-${size} ${className}`} onClick={onClick} disabled={disabled} {...props}>
    {children}
  </button>
)

export default Button
