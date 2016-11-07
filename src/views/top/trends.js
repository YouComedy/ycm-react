import {CONST} from 'common/const'
import {Post} from 'components/feed/post'
import {FeedFactory} from 'controllers/feed'

const FeedController = FeedFactory('feed.trends')
export class TrendsView extends React.PureComponent {
	static contextTypes = {
		dao: React.PropTypes.object
	}

	componentDidMount() {
		const {dao} = this.context
		const title = i18n.t('nav.top')
		dao.actions.app.setTitle(dao, {title})
	}

	renderPosts = (posts) => posts.map((post) =>
		<Post post={post} />
	)

	render() {
		return (
			<FeedController
				filters={CONST.FEED_FILTERS_TRENDS}
				loadFrom="top/loadTrends">
					{this.renderPosts}
			</FeedController>
		)
	}
}