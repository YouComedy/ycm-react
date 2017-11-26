import throttle from 'lodash.throttle'
import {CONST} from 'common/const'
import {branch} from 'common/dao'
import {Filters} from 'components/feed/filters'
import {Spinner} from 'components/feed/spinner'

export const FeedFactory = (selector) => branch({
	filter: `${selector}.filter`,
	isLoading: `${selector}.isLoading`,
	items: `${selector}.items`
}, class extends React.Component {
	static contextTypes = {
		dao() {}
	}

	state = {limiter: 0}

	constructor(...args) {
		super(...args)
		this.handlers = {
			onNextItem: this.onNextItem
		}
	}

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

	onNextItem = (_id) => {
		const {items, filter} = this.props
		const index = items[filter].findIndex(({id}) => id === _id)
		const nextItem = items[filter][index + 1]
		nextItem
			? document.getElementById(nextItem.id)
				.scrollIntoView({
					block: 'start',
					behavior: 'smooth'
				})
			: document.getElementById(_id)
				.scrollIntoView({
					block: 'end',
					behavior: 'smooth'
				})
	}

	onSelect = (id) => {
		const {dao} = this.context
		dao.actions.feed.setFilter(dao, {id, selector})
	}

	onScroll = throttle((e) => {
		const {filter, isLoading, items} = this.props
		if (isLoading) return

		const {clientHeight, scrollHeight, scrollTop} = document.documentElement
		if (scrollHeight - clientHeight - scrollTop < CONST.FEED_LOAD_OFFSET) {
			this.setState({limiter: items[filter].length})
		}
	}, 1000)

	renderFeed = () => {
		const {filter, items, children: renderItems} = this.props
		return renderItems(items[filter], this.handlers)
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
