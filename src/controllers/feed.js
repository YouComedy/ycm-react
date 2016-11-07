import {CONST} from 'common/const'
import {branch} from 'common/dao'
import {Filters} from 'components/feed/filters'
import {Spinner} from 'components/feed/spinner'

export const FeedFactory = (selector) => branch({
	filter: `${selector}.filter`,
	isLoading: `${selector}.isLoading`,
	items: `${selector}.items`
}, class extends React.PureComponent {
	static contextTypes = {
		dao: React.PropTypes.object
	}

	state = {limiter: 0}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
		this.loadFeed()
	}

	componentDidUpdate(prevProps, prevState) {
		const {filter, loadFrom} = this.props
		const {limiter} = this.state

		const next = limiter !== prevState.limiter
		const load = next || filter !== prevProps.filter
			|| loadFrom !== prevProps.loadFrom

		if (load) this.loadFeed(next)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}

	loadFeed = (next) => {
		const {dao} = this.context
		const {filter, loadFrom} = this.props
		const limiter = next ? this.state.limiter : 0
		const action = next ? 'mergeFeed' : 'setFeed'

		dao.actions.feed.loadFeed(dao, {
			filter, limiter, selector,
			loadFrom: typeof loadFrom === 'function'
				? loadFrom(filter)
				: loadFrom
		}).then((items) => dao.actions.feed[action](dao,
			{filter, items, selector}))
	}

	onSelect = (id) => {
		const {dao} = this.context
		dao.actions.feed.setFilter(dao, {id, selector})
	}

	onScroll = (e) => {
		const {filter, isLoading, items} = this.props
		if (isLoading) return

		const {clientHeight, scrollHeight} = document.documentElement
		const {scrollTop} = document.body

		if (scrollHeight - clientHeight - scrollTop < CONST.FEED_LOAD_OFFSET) {
			this.setState({limiter: items[filter].length})
		}
	}

	renderFeed = () => {
		const {filter, items, children: renderItems} = this.props
		return renderItems(items[filter])
	}

	renderFilters = () => {
		const {filter, filters} = this.props
		return filters &&
			<Filters filters={filters}
				selected={filter}
				onSelect={this.onSelect} />
	}

	renderSpinner = () =>
		this.props.isLoading && <Spinner />

	render() {
		return (
			<div>
				{this.renderFilters()}
				{this.renderFeed()}
				{this.renderSpinner()}
			</div>
		)
	}
})