// @ts-ignore
import React from "react";

// @ts-ignore
const Badge = ({ children, variant = 'default', className = '' }) => (
  <span className={`badge badge-${variant} ${className}`}>{children}</span>
)

export default Badge
