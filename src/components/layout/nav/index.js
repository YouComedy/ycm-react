import {Link} from 'react-router'
import 'primer-navigation/build/build.css'
import './index.css'

export const Nav = () =>
	<div>
		<nav className="menu">
			<Link className="menu-item"
				activeClassName="selected"
				to="/top">{i18n.t('nav.top')}</Link>

			<Link className="menu-item"
				activeClassName="selected"
				to="/top/trends">{i18n.t('nav.trends')}</Link>

			<Link className="menu-item"
				activeClassName="selected"
				to="/top/comments">{i18n.t('nav.comments')}</Link>
		</nav>

		<div className="tabnav">
			<nav className="tabnav-tabs">
				<Link className="tabnav-tab"
					activeClassName="selected"
					to="/top">{i18n.t('nav.top')}</Link>

				<Link className="tabnav-tab"
					activeClassName="selected"
					to="/top/trends">{i18n.t('nav.trends')}</Link>

				<Link className="tabnav-tab"
					activeClassName="selected"
					to="/top/comments">{i18n.t('nav.comments')}</Link>
			</nav>
		</div>
	</div>