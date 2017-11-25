import {Link} from 'react-router'
import {getDefaultAvatar} from 'common/const'
import {formatDate} from 'common/time'
import {Panel} from 'components/common/panel'
import {Thumb} from 'components/common/thumb'
import './index.css'

export class Post extends React.PureComponent {
	onClick = () => {
		this.props.onNextItem(this.props.post.id)
	}

	render() {
		const {
			content, content_numeric_timestamp, description, fullname,
			big_image, userAvatar, username, id
		} = this.props.post
		const toUser = `/user/${username}`

		return (
			<Panel className="post" id={id}>
				<div className="row">
					<div>
						<Thumb src={getDefaultAvatar(userAvatar)}
							alt={fullname}
							to={toUser} />
					</div>

					<div className="col-xs">
						<Link to={toUser}>{fullname}</Link>

						<div className="post__date">
							{formatDate(content_numeric_timestamp)}
						</div>

						<div className="post__content"
							onClick={this.onClick}>
								{big_image
									? <img className="post__image"
										src={big_image}
										alt={description} />

									: <div className="post__text"
										dangerouslySetInnerHTML={{
											__html: content
										}} />
								}
						</div>
					</div>
				</div>
			</Panel>
		)
	}
}