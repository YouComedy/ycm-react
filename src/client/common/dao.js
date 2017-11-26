import Baobab from 'baobab'
import {get, toSelector} from 'common/utils'

export const branch = (cursors, Component) =>
	class extends React.Component {
		static contextTypes = {
			dao() {}
		}

		constructor(props, context) {
			super(props, context)
			const tree = get(context, 'dao.tree')

			if (tree) {
				this.watcher = tree.watch(Object.keys(cursors)
					.reduce((o, k) => (o[k] = toSelector(o[k]), o), cursors))
				this.state = this.watcher.get()
			}
		}

		componentDidMount() {
			if (this.watcher) this.watcher.on('update', this.onUpdate)
		}

		componentWillUnmount() {
			if (this.watcher) this.watcher.release()
		}

		onUpdate = () => {
			this.setState(this.watcher.get())
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state} />
			)
		}
	}

export const getDao = (actions, getDefaultState) => {
	const tree = new Baobab(getDefaultState())
	return {
		get actions() {
			return actions
		},
		get defaultState() {
			return getDefaultState()
		},
		get tree() {
			return tree
		}
	}
}

export class Root extends React.Component {
	static childContextTypes = {
		dao() {}
	}

	getChildContext() {
		return {dao: this.props.dao}
	}

	render() {
		return this.props.children
	}
}
