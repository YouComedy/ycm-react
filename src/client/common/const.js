export const CONST = {
	ALERT_TIMEOUT: 3000,
	FEED_FILTERS_COMMENTS: ['new', '1d', '1w'],
	FEED_FILTERS_TOP: ['new', '6h', '1d', '1w', '1m'],
	FEED_FILTERS_TRENDS: ['1d', '1w'],
	FEED_LOAD_OFFSET: 2000,
	REQUEST_TIMEOUT: 30000,
	THUMB_AVATAR_BIG: '/ycm/common/img/profile/avatar_big.png',
	THUMB_AVATAR_SMALL: '/ycm/common/img/profile/avatar_small.png',
	THUMB_IMAGE: '/ycm/common/img/items/aa.jpg',
	THUMB_SIZE_BIG: 160,
	THUMB_SIZE_SMALL: 36
}

export const getDefaultAvatar = (src, isBig) =>
	src || CONST[isBig ? 'THUMB_AVATAR_BIG' : 'THUMB_AVATAR_SMALL']

export const getDefaultThumb = (src) =>
	src || CONST.THUMB_IMAGE