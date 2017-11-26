import {branch} from 'common/dao'
import {Layout} from 'components/layout'
import './index.css'

export const AppController = branch({
	alerts: 'app.alerts',
	title: 'app.title',
	user: 'app.user'
}, class extends React.Component {
	static contextTypes = {
		dao() {}
	}

	constructor(props, context) {
		super(props, context)
		const {dao} = context
		dao.actions.app.restoreState(dao)
	}

	componentDidMount() {
		const {dao} = this.context
		window.addEventListener('unload', () => dao.actions.app.saveState(dao))
	}

	render() {
		const {children, ...props} = this.props
		return (
			<Layout {...props}>
				{children}
			</Layout>
		)
	}
})
