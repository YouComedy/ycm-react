import {CONST} from 'common/const'
import {Post} from 'components/feed/post'
import {FeedFactory} from 'controllers/feed'

const FeedController = FeedFactory('feed.top')
export class TopView extends React.PureComponent {
	static contextTypes = {
		dao: React.PropTypes.object
	}

	componentDidMount() {
		const {dao} = this.context
		const title = i18n.t('nav.top')
		dao.actions.app.setTitle(dao, {title})
	}

	renderPosts = (posts) => posts.map((post) =>
		<Post post={post} key={post.id} />
	)

	render() {
		return (
			<FeedController
				filters={CONST.FEED_FILTERS_TOP}
				loadFrom="top/load">
					{this.renderPosts}
			</FeedController>
		)
	}
}