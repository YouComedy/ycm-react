import {Link} from 'react-router'
import {CONST} from 'common/const'
import 'primer-avatars/build/build.css'
import './index.css'

export const Thumb = ({
	className, isBig,
	size = isBig ? CONST.THUMB_SIZE_BIG : CONST.THUMB_SIZE_SMALL, src, to
}) =>
	<Link className={`avatar ${!isBig && 'avatar_small'} ${className}`}
		to={to}>
			<img src={src} width={size} height={size} />
	</Link>