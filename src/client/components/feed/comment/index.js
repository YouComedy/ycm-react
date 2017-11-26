import {Link} from 'react-router'
import {getDefaultAvatar, getDefaultThumb} from 'common/const'
import {formatDate} from 'common/time'
import {Panel} from 'components/common/panel'
import {Thumb} from 'components/common/thumb'
import './index.css'

export class Comment extends React.Component {
	replaceAttach = (text) => String(text)
		.replace(/<div data-attach-imagesmall/, '<img class="comment__attach" alt="" src')
		.replace('></div>', '>')

	onClickAttach = (e) => {
		if (e.target.classList.contains('comment__attach')) {
			console.info('TODO: handle attach')
		}
	}

	renderComment = (comment, isDetached) => {
		const {
			fullname, item_id, numeric_timestamp, item_small_image, text,
			timestamp, userAvatar, username
		} = comment
		const toUser = `/user/${username}`

		return <div className={isDetached ? 'row' : 'comment row'}
			id={isDetached ? undefined : comment.id}>
				<Thumb src={getDefaultAvatar(userAvatar)}
					title={fullname}
					to={toUser} />

				<div className="col-xs">
					<Link to={toUser}>{fullname}</Link>

					<div className="comment__date">
						{formatDate(numeric_timestamp || timestamp, 3)}
					</div>

					<div className="comment__content"
						dangerouslySetInnerHTML={{
							__html: this.replaceAttach(text)
						}} onClick={this.onClickAttach} />
				</div>

				{isDetached &&
					<Thumb src={getDefaultThumb(item_small_image)}
						to={`/${item_id}`} />
				}
		</div>
	}

	render() {
		const {comment, isDetached} = this.props

		return (
			isDetached
				? <Panel className="comment" id={comment.id}>
					{this.renderComment(comment, isDetached)}
				</Panel>
				: this.renderComment(comment, isDetached)
		)
	}
}
