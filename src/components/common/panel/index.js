import './index.css'

export const Panel = ({children, className}) =>
	<div className={`panel ${className}`}>{children}</div>