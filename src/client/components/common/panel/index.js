import './index.css'

export const Panel = ({children, className, id}) =>
	<div className={`panel ${className}`} id={id}>{children}</div>
