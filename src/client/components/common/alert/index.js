import 'primer-alerts/build/build.css'

export const Alert = ({children, className, type}) =>
	<div className={`flash flash-${type} ${className}`}>{children}</div>