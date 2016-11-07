import moment from 'moment'

export const formatDate = (timestamp, offset) =>
	moment.unix(timestamp)
		.add(offset, 'hours') // HACK: fix server time offset for comments
		.fromNow()