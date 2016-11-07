import {Nav} from 'components/layout/nav'
import {Alerts} from 'components/layout/alerts'
import {Title} from 'components/layout/title'
import {Top} from 'components/layout/top'
import 'flexboxgrid/css/flexboxgrid.css'
import './index.css'

export const Layout = ({children, alerts, title, user}) =>
	<div>
		<Title>{title}</Title>
		<Top />
		<Alerts alerts={alerts} />
		<div className="content content__main">
			<Nav user={user} />
			{children}
		</div>
	</div>