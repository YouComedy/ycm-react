import {CONST} from 'common/const'
import {Post} from 'components/feed/post'
import {FeedFactory} from 'controllers/feed'

const FeedController = FeedFactory('feed.trends')
export class TrendsView extends React.Component {
	static contextTypes = {
		dao() {}
	}

	componentDidMount() {
		const {dao} = this.context
		const title = i18n.t('nav.top')
		dao.actions.app.setTitle(dao, {title})
	}

	renderPosts = (posts, handlers) => posts.map((post) =>
		<Post post={post} key={post.id} {...handlers} />
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
