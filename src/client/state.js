import {CONST} from 'common/const'

const getItems = (ids) =>
	ids.reduce((o, id) => (o[id] = [], o), {})

const {title} = document

export const getDefaultState = () => ({
	app: {
		alerts: [],
		title,
		user: null,
		version: __VERSION__
	},
	feed: {
		comments: {
			isLoading: false,
			items: getItems(CONST.FEED_FILTERS_COMMENTS),
			filter: '1d'
		},
		top: {
			isLoading: false,
			items: getItems(CONST.FEED_FILTERS_TOP),
			filter: '6h'
		},
		trends: {
			isLoading: false,
			items: getItems(CONST.FEED_FILTERS_TRENDS),
			filter: '1d'
		}
	}
})