import {Alert} from 'components/common/alert'
import './index.css'

export const Alerts = ({alerts}) =>
	<div className="alerts">
		<div className="content">
			{alerts.map(({text, type}, i) =>
				<Alert className="alerts__alert"
					key={i} type={type}>{text}</Alert>
			)}
		</div>
	</div>