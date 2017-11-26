import {Link} from 'react-router'
import {CONST} from 'common/const'
import './index.css'

export const Thumb = ({isBig, src, title, to}) =>
	<Link className={`thumb ${isBig && 'thumb--big'}`}
		style={{backgroundImage: `url(${src})`}}
		title={title}
		to={to}
	/>
