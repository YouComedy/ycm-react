import {Link} from 'react-router'
import {getDefaultAvatar, getDefaultThumb} from 'common/const'
import {formatDate} from 'common/time'
import {Panel} from 'components/common/panel'
import {Thumb} from 'components/common/thumb'
import './index.css'

export class Comment extends React.PureComponent {
	replaceAttach = (text) => String(text)
			.replace(/<div data-attach-imagesmall/,
				'<img class="comment__attach" alt="" src')
			.replace('></div>', '>')

	onClickAttach = (e) => {
		if (e.target.classList.contains('comment__attach')) {
			console.info('TODO: handle attach')
		}
	}

	render() {
		const {
			fullname, item_id, numeric_timestamp, item_small_image, text,
			userAvatar, username
		} = this.props.comment
		const toUser = `/user/${username}`

		return (
			<Panel className="comment">
				<div className="row">
					<div>
						<Thumb src={getDefaultAvatar(userAvatar)}
							alt={fullname}
							to={toUser} />
					</div>

					<div className="col-xs">
						<Link to={toUser}>{fullname}</Link>

						<div className="comment__date">
							{formatDate(numeric_timestamp, 3)}
						</div>

						<div className="comment__content"
							dangerouslySetInnerHTML={{
								__html: this.replaceAttach(text)
							}} onClick={this.onClickAttach} />
					</div>

					<div>
						<Thumb src={getDefaultThumb(item_small_image)}
							to={`/${item_id}`} />
					</div>
				</div>
			</Panel>
		)
	}
}