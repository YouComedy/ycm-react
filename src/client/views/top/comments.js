import {CONST} from 'common/const'
import {Comment} from 'components/feed/comment'
import {FeedFactory} from 'controllers/feed'

const FeedController = FeedFactory('feed.comments')
export class CommentsView extends React.Component {
	static contextTypes = {
		dao() {}
	}

	componentDidMount() {
		const {dao} = this.context
		const title = i18n.t('nav.top')
		dao.actions.app.setTitle(dao, {title})
	}

	loadFrom = (filter) =>
		filter === 'new'
			? 'commentfeed'
			: 'top/loadComments'

	renderComments = (comments) =>
		comments.map((comment) =>
			<Comment comment={comment}
				id={comment.id}
				isDetached
				key={comment.id} />
		)

	render() {
		return (
			<FeedController
				filters={CONST.FEED_FILTERS_COMMENTS}
				loadFrom={this.loadFrom}>
					{this.renderComments}
			</FeedController>
		)
	}
}
