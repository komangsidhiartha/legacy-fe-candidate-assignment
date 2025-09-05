// @ts-ignore
import React from "react";

// @ts-ignore
export const Card = ({ children, className = '' }) => <div className={`card ${className}`}>{children}</div>

// @ts-ignore
export const CardHeader = ({ children }) => <div className='card-header'>{children}</div>

// @ts-ignore
export const CardTitle = ({ children, className = '' }) => <h3 className={`card-title ${className}`}>{children}</h3>

// @ts-ignore
export const CardDescription = ({ children }) => <p className='card-description'>{children}</p>

// @ts-ignore
export const CardContent = ({ children, className = '' }) => <div className={`card-content ${className}`}>{children}</div>
